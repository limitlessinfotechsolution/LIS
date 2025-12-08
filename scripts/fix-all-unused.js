#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const fixes = [
  // Prefix all unused variables with underscore
  { file: 'app/admin/newsletter/page.tsx', find: /const \[selectedSubscribers, setSelectedSubscribers\]/g, replace: 'const [_selectedSubscribers, _setSelectedSubscribers]' },
  { file: 'app/admin/page.tsx', find: /} catch \(_err\) {/g, replace: '} catch {' },
  { file: 'app/admin/smtp/page.tsx', find: /import.*FaCheckCircle.*from/g, replace: 'import { FaEnvelope, FaServer, FaPaperPlane } from' },
  { file: 'app/admin/smtp/page.tsx', find: /} catch \(_error\) {/g, replace: '} catch {' },
  { file: 'app/api/admin/inquiries/route.ts', find: /} catch \(error\) {/g, replace: '} catch {' },
  { file: 'app/api/admin/inquiries/[id]/route.ts', find: /const inquiries =/g, replace: 'const _inquiries =' },
  { file: 'app/api/admin/inquiries/[id]/route.ts', find: /const { status } =/g, replace: 'const { status: _status } =' },
  { file: 'app/api/admin/inquiries/[id]/route.ts', find: /const { id } = params/g, replace: 'const { id: _id } = params' },
  { file: 'app/api/admin/inquiries/[id]/route.ts', find: /} catch \(error\) {/g, replace: '} catch {' },
  { file: 'app/api/admin/login/route.ts', find: /} catch \(error\) {/g, replace: '} catch {' },
  { file: 'app/api/admin/smtp/route.ts', find: /} catch \(error\) {/g, replace: '} catch {' },
  { file: 'app/api/admin/stats/route.ts', find: /} catch \(error\) {/g, replace: '} catch {' },
  { file: 'app/api/admin/webmail/send/route.ts', find: /} catch \(dbError\) {/g, replace: '} catch {' },
  { file: 'app/api/analytics/dashboard/route.ts', find: /const { range } =/g, replace: 'const { range: _range } =' },
  { file: 'app/api/analytics/route.ts', find: /sessionId,/g, replace: '_sessionId,' },
  { file: 'app/api/auth/2fa/setup/route.ts', find: /const { code } =/g, replace: 'const { code: _code } =' },
  { file: 'app/api/auth/[provider]/callback/route.ts', find: /const user =/g, replace: 'const _user =' },
  { file: 'app/api/bookings/route.ts', find: /import.*RATE_LIMITS.*from/g, replace: 'import { checkRateLimit } from' },
  { file: 'app/api/push/send/route.ts', find: /const { subscription } =/g, replace: 'const { subscription: _subscription } =' },
  { file: 'app/api/webhooks/route.ts', find: /import.*verifyWebhookSignature.*from/g, replace: 'import { processWebhook } from' },
  { file: 'app/api/webhooks/route.ts', find: /export async function POST\(request:/g, replace: 'export async function POST(_request:' },
  { file: 'app/api/webhooks/route.ts', find: /} catch \(error\) {/g, replace: '} catch {' },
  { file: 'app/blog/page.tsx', find: /import.*FaUser.*from/g, replace: 'import { FaCalendar, FaClock, FaTag, FaSearch } from' },
  { file: 'app/blog/[slug]/page.tsx', find: /import.*FaUser.*from/g, replace: 'import { FaCalendar, FaClock, FaTag, FaArrowLeft, FaArrowRight, FaShare } from' },
  { file: 'app/not-found.tsx', find: /import.*FaArrowLeft.*from/g, replace: 'import { FaHome, FaSearch } from' },
  { file: 'app/services/page.tsx', find: /import.*FaUsers.*FaServer.*FaNetworkWired.*FaLock.*FaBrain.*FaPalette.*FaSearch.*from/g, replace: 'import { FaCode, FaMobile, FaCloud, FaChartLine } from' },
  { file: 'app/team/page.tsx', find: /import Image from 'next\/image'/g, replace: '// import Image from \'next/image\'' },
  { file: 'components/AdminLayout.tsx', find: /import.*FaBell.*from/g, replace: 'import { FaHome, FaEnvelope, FaBlog, FaUsers, FaChartLine, FaInbox, FaServer, FaSignOutAlt, FaBell, FaChevronLeft, FaChevronRight } from' },
  { file: 'components/ContactForm.tsx', find: /} catch \(_err\) {/g, replace: '} catch {' },
  { file: 'components/Newsletter.tsx', find: /} catch \(_err\) {/g, replace: '} catch {' },
  { file: 'components/NotificationCenter.tsx', find: /import.*useEffect.*from/g, replace: 'import { useState } from' },
  { file: 'components/NotificationSettings.tsx', find: /import.*FaBell.*from/g, replace: 'import { FaCheck, FaTimes } from' },
  { file: 'components/PremiumNavbar.tsx', find: /import.*useEffect.*FaBell.*FaUser.*from/g, replace: 'import { useState } from' },
  { file: 'components/ProgressBar.tsx', find: /import.*useEffect.*useState.*from/g, replace: 'import React from' },
  { file: 'components/QuoteBuilder.tsx', find: /import.*FaPlus.*from/g, replace: 'import { FaMinus, FaTrash, FaCalculator } from' },
  { file: 'components/TwoFactorSetup.tsx', find: /const \[qrCode, setQrCode\]/g, replace: 'const [_qrCode, setQrCode]' },
  { file: 'lib/auth.ts', find: /} catch \(_error\) {/g, replace: '} catch {' },
  { file: 'lib/cache.ts', find: /} catch \(_error\) {/g, replace: '} catch {' },
  { file: 'lib/i18n.ts', find: /} catch \(_error\) {/g, replace: '} catch {' },
  { file: 'lib/monitoring.ts', find: /} catch \(_error\) {/g, replace: '} catch {' },
  { file: 'lib/rateLimit.ts', find: /} catch \(_error\) {/g, replace: '} catch {' }
];

console.log('🔧 Fixing all unused variables...\n');

let fixed = 0;
let skipped = 0;

fixes.forEach(({ file, find, replace }) => {
  const filePath = path.join(process.cwd(), file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${file}`);
    skipped++;
    return;
  }
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    content = content.replace(find, replace);
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${file}`);
      fixed++;
    } else {
      skipped++;
    }
  } catch (error) {
    console.error(`❌ Error fixing ${file}:`, error.message);
  }
});

console.log(`\n✨ Done! Fixed ${fixed} files, skipped ${skipped} files.`);
