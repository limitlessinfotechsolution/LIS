#!/usr/bin/env node

/**
 * Script to automatically fix common ESLint issues
 */

const fs = require('fs');
const path = require('path');

const fixes = [
  // Remove unused error variables
  {
    file: 'app/admin/page.tsx',
    find: /} catch \(err\) {/g,
    replace: '} catch (_err) {'
  },
  {
    file: 'app/admin/smtp/page.tsx',
    find: /} catch \(error\) {/g,
    replace: '} catch (_error) {'
  },
  {
    file: 'components/ContactForm.tsx',
    find: /} catch \(err\) {/g,
    replace: '} catch (_err) {'
  },
  {
    file: 'components/Newsletter.tsx',
    find: /} catch \(err\) {/g,
    replace: '} catch (_err) {'
  },
  {
    file: 'lib/auth.ts',
    find: /} catch \(error\) {/g,
    replace: '} catch (_error) {'
  },
  {
    file: 'lib/cache.ts',
    find: /} catch \(error\) {/g,
    replace: '} catch (_error) {'
  },
  {
    file: 'lib/i18n.ts',
    find: /} catch \(error\) {/g,
    replace: '} catch (_error) {'
  },
  {
    file: 'lib/monitoring.ts',
    find: /} catch \(error\) {/g,
    replace: '} catch (_error) {'
  },
  {
    file: 'lib/rateLimit.ts',
    find: /} catch \(error\) {/g,
    replace: '} catch (_error) {'
  }
];

console.log('🔧 Fixing ESLint issues...\n');

fixes.forEach(({ file, find, replace }) => {
  const filePath = path.join(process.cwd(), file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${file}`);
    return;
  }
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    content = content.replace(find, replace);
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${file}`);
    } else {
      console.log(`ℹ️  No changes: ${file}`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${file}:`, error.message);
  }
});

console.log('\n✨ Done!');
