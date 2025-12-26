# Phase 1 Setup Guide - Cookie Consent & Google Analytics

This guide explains how to configure and test the LGPD/GDPR cookie consent system and Google Analytics 4 integration.

## 🎯 Overview

Phase 1 implements:
- ✅ LGPD/GDPR compliant cookie consent banner
- ✅ Google Consent Mode v2 integration
- ✅ Google Analytics 4 with consent-aware tracking
- ✅ Multi-language support (pt/en/es)
- ✅ Accessibility improvements (WCAG 2.1 AA)
- ✅ Dark mode foundation

## 🔧 Environment Setup

### 1. Create `.env.local` file

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

### 2. Configure Environment Variables

Edit `.env.local` and add your credentials:

```env
# Google Analytics 4
# Get your GA4 Measurement ID from: https://analytics.google.com/
# Example: G-XXXXXXXXXX
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google AdSense
# Get your AdSense Publisher ID from: https://adsense.google.com/
# Example: ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_ID=ca-pub-XXXXXXXXXXXXXXXX

# Site URL (for sitemap and canonical URLs)
NEXT_PUBLIC_SITE_URL=https://ferramentasdigitais.com.br
```

## 📊 Google Analytics 4 Setup

### Step 1: Create GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon)
3. Create a new **Property**
4. Choose **Web** as platform
5. Enter your website details
6. Copy your **Measurement ID** (format: G-XXXXXXXXXX)

### Step 2: Enable Google Consent Mode v2

1. In GA4, go to **Admin > Data collection and modification > Data streams**
2. Click on your web data stream
3. Scroll to **Google tag**
4. Click **Configure tag settings**
5. Enable **Consent Mode** (should be enabled by default)
6. Verify these consent signals are tracked:
   - `ad_storage`
   - `analytics_storage`
   - `ad_user_data`
   - `ad_personalization`

### Step 3: Test GA4 Integration

1. Start development server:
```bash
npm run dev
```

2. Open your site in browser (http://localhost:3000)
3. Open **Chrome DevTools > Console**
4. You should see no GA4 scripts loading (default consent is denied)
5. Click **"Aceitar Todos"** on cookie banner
6. Check DevTools **Network** tab - you should see:
   - `gtag/js?id=G-XXXXXXXXXX` (GA4 script)
   - `collect` requests (analytics events)

### Step 4: Verify Real-time Tracking

1. In GA4, go to **Reports > Real-time**
2. Browse your site with cookies accepted
3. You should see your session appear in real-time reports

## 🍪 Cookie Consent Testing Checklist

### Visual Testing

- [ ] Cookie banner appears on first visit
- [ ] Banner shows in all 3 languages (pt/en/es)
- [ ] Reject and Accept buttons have equal visual prominence
- [ ] Clicking "Aceitar Todos" saves consent and hides banner
- [ ] Clicking "Rejeitar Todos" denies non-essential cookies
- [ ] Clicking "Personalizar Cookies" opens settings modal
- [ ] Settings modal shows granular controls
- [ ] Necessary cookies cannot be disabled
- [ ] Banner doesn't reappear after consent given

### Functional Testing

#### Test 1: Accept All Cookies
1. Open site in incognito mode
2. Click "Aceitar Todos"
3. Open DevTools > Application > Cookies
4. Verify `user_consent` cookie exists with:
   ```json
   {
     "hasConsent": true,
     "categories": {
       "necessary": true,
       "analytics": true,
       "advertising": true
     },
     "timestamp": 1234567890
   }
   ```
5. Refresh page - banner should NOT appear
6. Check DevTools Console - GA4 consent should be 'granted'

#### Test 2: Reject All Cookies
1. Open site in new incognito mode
2. Click "Rejeitar Todos"
3. Verify `user_consent` cookie with analytics/advertising as `false`
4. Check DevTools Network - no GA4 scripts should load
5. Refresh page - banner should NOT appear

#### Test 3: Custom Consent
1. Open site in new incognito mode
2. Click "Personalizar Cookies"
3. Enable only "Analytics"
4. Click "Salvar Preferências"
5. Verify GA4 loads but AdSense doesn't

#### Test 4: Consent Expiry
The consent cookie expires after 365 days. To test:
1. Accept cookies
2. Open DevTools > Application > Cookies
3. Change the timestamp in `user_consent` to 13 months ago
4. Refresh page
5. Cookie banner should appear again

### Accessibility Testing

- [ ] Tab through all interactive elements
- [ ] Focus indicators visible on all buttons
- [ ] Press Escape to close settings modal
- [ ] Screen reader announces all buttons correctly
- [ ] High contrast mode works properly
- [ ] Reduced motion respected

### Multi-language Testing

Test in all 3 languages:
- [ ] Portuguese (pt): http://localhost:3000/pt
- [ ] English (en): http://localhost:3000/en
- [ ] Spanish (es): http://localhost:3000/es

Verify:
- Cookie banner text translates correctly
- Settings modal translates correctly
- All category descriptions make sense

## 📱 Google Ads Compliance

Your site now meets Google Ads requirements:

### ✅ Checklist for Google Ads Approval

- [x] Cookie consent banner (LGPD/GDPR compliant)
- [x] Reject option with equal prominence
- [x] Granular consent by category
- [x] Google Consent Mode v2 integration
- [x] Default consent is "denied"
- [x] Privacy policy link (need to create policy page)
- [ ] Create Privacy Policy page → **TODO**
- [ ] Create Cookie Policy page → **TODO**
- [ ] Add Privacy/Cookie policy links to footer → **TODO**

## 🐛 Troubleshooting

### Issue: Cookie banner not appearing

**Solution:**
1. Clear browser cookies and cache
2. Use incognito mode for testing
3. Check DevTools Console for errors

### Issue: GA4 not tracking events

**Solution:**
1. Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.local`
2. Check that consent is granted (accept cookies)
3. Verify in DevTools Network tab that `collect` requests are sent
4. Wait 24-48 hours for data to appear in GA4 reports (real-time should work immediately)

### Issue: Consent state not persisting

**Solution:**
1. Check if cookies are enabled in browser
2. Verify `user_consent` cookie is being set
3. Check cookie expiry is 365 days

### Issue: Dark mode not working

**Solution:**
1. Dark mode toggle will be added in Phase 4
2. Currently, dark mode classes are in place but no UI to toggle
3. You can test by adding `dark` class to `<html>` element manually

## 📋 Next Steps - Phase 2

After completing Phase 1 setup:

1. **Create legal pages:**
   - Privacy Policy page
   - Cookie Policy page
   - Terms of Service page

2. **Phase 2: Accessibility Foundation**
   - Comprehensive keyboard navigation
   - ARIA labels on all components
   - Screen reader testing
   - Focus trap in modals

3. **Phase 3: Navigation & Search**
   - Category navigation in header
   - Mobile menu with categories
   - Search functionality
   - Breadcrumbs
   - Favorites system

4. **Phase 4: Dark Mode**
   - Dark mode toggle component
   - Theme persistence
   - System preference detection (optional)

## 📚 Resources

- [Google Consent Mode v2 Documentation](https://support.google.com/analytics/answer/9976101)
- [LGPD Cookie Consent Requirements](https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd)
- [GDPR Cookie Consent Guide](https://gdpr.eu/cookies/)
- [Google Analytics 4 Setup](https://support.google.com/analytics/answer/9304153)
- [WCAG 2.1 AA Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## 🎉 Success Criteria

Phase 1 is complete when:

- ✅ Build succeeds without errors
- ✅ Cookie banner appears and functions correctly
- ✅ Consent saves and persists properly
- ✅ GA4 tracks events after consent
- ✅ All 3 languages work
- ✅ Accessibility features work
- ✅ Google Consent Mode v2 signals sent correctly

---

**Status:** Phase 1 Complete ✅

**Commit:** `feat: Implement LGPD/GDPR Cookie Consent + Google Consent Mode v2`

**Branch:** `claude/free-utilities-website-0d1Vc`
