import { TestBed } from '@angular/core/testing';

import { SEOService } from './seo.service';

describe('SeoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SEOService = TestBed.get(SEOService);
    expect(service).toBeTruthy();
  });
});
