const Booking = require('../model/Booking')
const verifyBookingExists = require('../util/bookingFunctions').verifyBookingExists
const checkForConflictedBooking = require('../util/bookingFunctions').checkForConflictedBooking
const rp = require('request-promise')
const Room = require('../../rooms/model/Room')
const User = require('../../users/model/User')

module.exports = {
  method: 'PATCH',
  path: '/api/bookings/{id}/status',
  options: {
    pre: [{
        method: verifyBookingExists,
        assign: 'booking'
      },
      {
        method: checkForConflictedBooking,
        assign: 'conflictedBooking'
      }
    ],
    handler: async (request, h) => {
        const booking = await Booking.findOneAndUpdate({
          _id: request.params.id
        }, {
          $set: {
            status: request.payload.status
          }
        }, {
          new: true
        })

        let booking_user = await User.findById({
          _id: booking.user_id
        })
        const user = await User.findById({
          _id: request.auth.credentials.id
        })
        const room = await Room.findById({
          _id: booking.room
        })

        // refresh access token
        const client_id = process.env.CLIENT_ID
        const client_secret = process.env.CLIENT_SECRET
        const authorization_token = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

        try {
          let options = {
            method: 'POST',
            url: 'https://gymkhana.iitb.ac.in/sso/oauth/token/',
            headers: {
              'Authorization': `Basic ${authorization_token}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
              refresh_token: booking_user.refresh_token,
              grant_type: 'refresh_token'
            }
          }

          let res = await rp(options)
          res = JSON.parse(res)

          booking_user = await User.findOneAndUpdate(
            { _id: booking_user._id },
            {
              $set: {
                access_token: res.access_token,
                refresh_token: res.refresh_token
              }
            },
            {
              new: true
            }
          )

          // send email to the user who booked room after getting
          // refreshed token
          try {
            options = {
              method: 'POST',
              url: 'https://gymkhana.iitb.ac.in/sso/user/api/user/send_mail/',
              headers: {
                'Authorization': `Bearer ${booking_user.access_token}`,
                'Content-Type': 'application/json'
              },
              body: {
                'subject': 'Change of Room Booking Status',
                'message': `Your booking for ${room.name} from ${booking.from} to ${booking.to}
                            has been ${booking.status} by ${user.ldap_username}
                            `,
                'reply_to': [
                  'rohitrp@iitb.ac.in'
                ]
              },
              json: true
            }

            rp(options).then(
              (res) => {
                console.log('success');
                console.log(res);
              },
              (err) => {
                console.log('error');
                console.log(err)
              })
            res = JSON.parse(res)
            console.log(res)
          } catch {
            console.log('Failed to send email')
          }
          
        } catch {
          console.log('Failed to get refresh token')
        }

        return {
          message: `Booking ${request.payload.status}`,
          booking: {
            status: request.payload.status
          }
        }
      },
      auth: {
        strategy: 'jwt',
        scope: ['admin', 'moderator']
      },
      description: 'Approve booking',
      notes: 'Approves the booking',
      tags: ['api', 'booking']
  }


}
