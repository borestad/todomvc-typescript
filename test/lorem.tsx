export function div (h) {
  return h(
    'div',
    { class: 'page-wrapper' },
    h(
      'section',
      { class: 'intro', foo: 'bar', id: 'zen-intro' },
      h(
        'header',
        { role: 'banner' },
        h('h1', null, 'CSS Zen Garden'),
        h(
          'h2',
          null,
          'The Beauty of ',
          h('abbr', { title: 'Cascading Style Sheets' }, 'CSS'),
          ' Design'
        ),
        h('h1', null, 'Second Title')
      ),
      h(
        'div',
        { class: 'summary', id: 'zen-summary', role: 'article' },
        h(
          'p',
          null,
          'A demonstration of what can be accomplished through ',
          h('abbr', { title: 'Cascading Style Sheets' }, 'CSS'),
          '-based design. Select any style sheet from the list to load it into this page.'
        ),
        h(
          'p',
          null,
          'Download the example ',
          h(
            'a',
            { href: '/examples/index', title: 'This page\'s source HTML code, not to be modified.' },
            'html file'
          ),
          ' and ',
          h(
            'a',
            {
              href: '/examples/style.css',
              title: 'This page\'s sample CSS, the file you may modify.'
            },
            'css file'
          )
        )
      ),
      h(
        'div',
        { class: 'preamble', id: 'zen-preamble', role: 'article' },
        h('h3', null, 'The Road to Enlightenment'),
        h(
          'p',
          null,
          'Littering a dark and dreary road lay the past relics of browser-specific tags, incompatible ',
          h('abbr', { title: 'Document Object Model' }, 'DOM'),
          's, broken ',
          h('abbr', { title: 'Cascading Style Sheets' }, 'CSS'),
          ' support, and abandoned browsers.'
        ),
        h(
          'p',
          null,
          'We must clear the mind of the past. Web enlightenment has been achieved thanks to the tireless efforts of folk like the ',
          h('abbr', { title: 'World Wide Web Consortium' }, 'W3C'),
          ', ',
          h('abbr', { title: 'Web Standards Project' }, 'WaSP'),
          ', and the major browser creators.'
        ),
        h(
          'p',
          null,
          'The CSS Zen Garden invites you to relax and meditate on the important lessons of the masters. Begin to see with clarity. Learn to use the time-honored techniques in new and invigorating fashion. Become one with the web.'
        )
      )
    ),
    h(
      'div',
      { class: 'main supporting', id: 'zen-supporting', role: 'main' },
      h(
        'div',
        { class: 'explanation', id: 'zen-explanation', role: 'article' },
        h('h3', null, 'So What is This About?'),
        h(
          'p',
          null,
          'There is a continuing need to show the power of ',
          h('abbr', { title: 'Cascading Style Sheets' }, 'CSS'),
          '. The Zen Garden aims to excite, inspire, and encourage participation. To begin, view some of the existing designs in the list. Clicking on any one will load the style sheet into this very page. The ',
          h('abbr', { title: 'HyperText Markup Language' }, 'HTML'),
          ' remains the same, the only thing that has changed is the external ',
          h('abbr', { title: 'Cascading Style Sheets' }, 'CSS'),
          ' file. Yes, really.'
        ),
        h(
          'p',
          null,
          h('abbr', { title: 'Cascading Style Sheets' }, 'CSS'),
          ' allows complete and total control over the style of a hypertext document. The only way this can be illustrated in a way that gets people excited is by demonstrating what it can truly be, once the reins are placed in the hands of those able to create beauty from structure. Designers and coders alike have contributed to the beauty of the web; we can always push it further.'
        )
      ),
      h(
        'div',
        { class: 'participation', id: 'zen-participation', role: 'article' },
        h('h3', null, 'Participation'),
        h(
          'p',
          null,
          'Strong visual design has always been our focus. You are modifying this page, so strong ',
          h('abbr', { title: 'Cascading Style Sheets' }, 'CSS'),
          ' skills are necessary too, but the example files are commented well enough that even ',
          h('abbr', { title: 'Cascading Style Sheets' }, 'CSS'),
          ' novices can use them as starting points. Please see the ',
          h(
            'a',
            {
              href: 'http://www.mezzoblue.com/zengarden/resources/',
              title: 'A listing of CSS-related resources'
            },
            h('abbr', { title: 'Cascading Style Sheets' }, 'CSS'),
            ' Resource Guide'
          ),
          ' for advanced tutorials and tips on working with ',
          h('abbr', { title: 'Cascading Style Sheets' }, 'CSS'),
          '.'
        ),
        h(
          'p',
          null,
          'You may modify the style sheet in any way you wish, but not the ',
          h('abbr', { title: 'HyperText Markup Language' }, 'HTML'),
          '. This may seem daunting at first if you\u2019ve never worked this way before, but follow the listed links to learn more, and use the sample files as a guide.'
        ),
        h(
          'p',
          null,
          'Download the sample ',
          h(
            'a',
            { href: '/examples/index', title: 'This page\'s source HTML code, not to be modified.' },
            'HTML'
          ),
          ' and ',
          h(
            'a',
            {
              href: '/examples/style.css',
              title: 'This page\'s sample CSS, the file you may modify.'
            },
            'CSS'
          ),
          ' to work on a copy locally. Once you have completed your masterpiece (and please, don\u2019t submit half-finished work) upload your ',
          h('abbr', { title: 'Cascading Style Sheets' }, 'CSS'),
          ' file to a web server under your control. ',
          h(
            'a',
            {
              href: 'http://www.mezzoblue.com/zengarden/submit/',
              title: 'Use the contact form to send us your CSS file'
            },
            'Send us a link'
          ),
          ' to an archive of that file and all associated assets, and if we choose to use it we will download it and place it on our server.'
        )
      ),
      h(
        'div',
        { class: 'benefits', id: 'zen-benefits', role: 'article' },
        h('h3', null, 'Benefits'),
        h(
          'p',
          null,
          'Why participate? For recognition, inspiration, and a resource we can all refer to showing people how amazing ',
          h('abbr', { title: 'Cascading Style Sheets' }, 'CSS'),
          ' really can be. This site serves as equal parts inspiration for those working on the web today, learning tool for those who will be tomorrow, and gallery of future techniques we can all look forward to.'
        )
      ),
      h(
        'div',
        { class: 'requirements', id: 'zen-requirements', role: 'article' },
        h('h3', null, 'Requirements'),
        h(
          'p',
          null,
          'Where possible, we would like to see mostly ',
          h('abbr', { title: 'Cascading Style Sheets, levels 1 and 2' }, 'CSS 1 & 2'),
          ' usage. ',
          h('abbr', { title: 'Cascading Style Sheets, levels 3 and 4' }, 'CSS 3 & 4'),
          ' should be limited to widely-supported elements only, or strong fallbacks should be provided. The CSS Zen Garden is about functional, practical ',
          h('abbr', { title: 'Cascading Style Sheets' }, 'CSS'),
          ' and not the latest bleeding-edge tricks viewable by 2% of the browsing public. The only real requirement we have is that your ',
          h('abbr', { title: 'Cascading Style Sheets' }, 'CSS'),
          ' validates.'
        ),
        h(
          'p',
          null,
          'Luckily, designing this way shows how well various browsers have implemented ',
          h('abbr', { title: 'Cascading Style Sheets' }, 'CSS'),
          ' by now. When sticking to the guidelines you should see fairly consistent results across most modern browsers. Due to the sheer number of user agents on the web these days \u2014 especially when you factor in mobile \u2014 pixel-perfect layouts may not be possible across every platform. That\u2019s okay, but do test in as many as you can. Your design should work in at least IE9+ and the latest Chrome, Firefox, iOS and Android browsers (run by over 90% of the population).'
        ),
        h(
          'p',
          null,
          'We ask that you submit original artwork. Please respect copyright laws. Please keep objectionable material to a minimum, and try to incorporate unique and interesting visual themes to your work. We\u2019re well past the point of needing another garden-related design.'
        ),
        h(
          'p',
          null,
          'This is a learning exercise as well as a demonstration. You retain full copyright on your graphics (with limited exceptions, see ',
          h(
            'a',
            { href: 'http://www.mezzoblue.com/zengarden/submit/guidelines/' },
            'submission guidelines'
          ),
          '), but we ask you release your ',
          h('abbr', { title: 'Cascading Style Sheets' }, 'CSS'),
          ' under a Creative Commons license identical to the ',
          h(
            'a',
            {
              href: 'http://creativecommons.org/licenses/by-nc-sa/3.0/',
              title: 'View the Zen Garden\'s license information.'
            },
            'one on this site'
          ),
          ' so that others may learn from your work.'
        ),
        h(
          'p',
          { role: 'contentinfo' },
          'By ',
          h('a', { href: 'http://www.mezzoblue.com/' }, 'Dave Shea'),
          '. Bandwidth graciously donated by ',
          h('a', { href: 'http://www.mediatemple.net/' }, 'mediatemple'),
          '. Now available: ',
          h(
            'a',
            { href: 'http://www.amazon.com/exec/obidos/ASIN/0321303474/mezzoblue-20/' },
            'Zen Garden, the book'
          ),
          '.'
        )
      ),
      h(
        'footer',
        null,
        h(
          'a',
          {
            href: 'http://validator.w3.org/check/referer',
            title: 'Check the validity of this site\u2019s HTML',
            class: 'zen-validate-html'
          },
          'HTML'
        ),
        h(
          'a',
          {
            href: 'http://jigsaw.w3.org/css-validator/check/referer',
            title: 'Check the validity of this site\u2019s CSS',
            class: 'zen-validate-css'
          },
          'CSS'
        ),
        h(
          'a',
          {
            href: 'http://creativecommons.org/licenses/by-nc-sa/3.0/',
            title:
              'View the Creative Commons license of this site: Attribution-NonCommercial-ShareAlike.',
            class: 'zen-license'
          },
          'CC'
        ),
        h(
          'a',
          {
            href: 'http://mezzoblue.com/zengarden/faq/#aaa',
            title: 'Read about the accessibility of this site',
            class: 'zen-accessibility'
          },
          'A11y'
        ),
        h(
          'a',
          {
            href: 'https://github.com/mezzoblue/csszengarden.com',
            title: 'Fork this site on Github',
            class: 'zen-github'
          },
          'GH'
        )
      )
    ),
    h(
      'aside',
      { class: 'sidebar', role: 'complementary' },
      h(
        'div',
        { class: 'wrapper' },
        h(
          'div',
          { class: 'design-selection', id: 'design-selection' },
          h('h3', { class: 'select' }, 'Select a Design:'),
          h(
            'nav',
            { role: 'navigation' },
            h(
              'ul',
              null,
              h(
                'li',
                null,
                h('a', { href: '/221/', class: 'design-name' }, 'Mid Century Modern'),
                ' by      ',
                h('a', { href: 'http://andrewlohman.com/', class: 'designer-name' }, 'Andrew Lohman')
              ),
              '     ',
              h(
                'li',
                null,
                h('a', { href: '/220/', class: 'design-name' }, 'Garments'),
                ' by      ',
                h('a', { href: 'http://danielmall.com/', class: 'designer-name' }, 'Dan Mall')
              ),
              '     ',
              h(
                'li',
                null,
                h('a', { href: '/219/', class: 'design-name' }, 'Steel'),
                ' by      ',
                h(
                  'a',
                  { href: 'http://steffen-knoeller.de', class: 'designer-name' },
                  'Steffen Knoeller'
                )
              ),
              '     ',
              h(
                'li',
                null,
                h('a', { href: '/218/', class: 'design-name' }, 'Apothecary'),
                ' by      ',
                h('a', { href: 'http://trentwalton.com', class: 'designer-name' }, 'Trent Walton')
              ),
              '     ',
              h(
                'li',
                null,
                h('a', { href: '/217/', class: 'design-name' }, 'Screen Filler'),
                ' by      ',
                h(
                  'a',
                  { href: 'http://elliotjaystocks.com/', class: 'designer-name' },
                  'Elliot Jay Stocks'
                )
              ),
              '     ',
              h(
                'li',
                null,
                h('a', { href: '/216/', class: 'design-name' }, 'Fountain Kiss'),
                ' by      ',
                h('a', { href: 'http://jeremycarlson.com', class: 'designer-name' }, 'Jeremy Carlson')
              ),
              '     ',
              h(
                'li',
                null,
                h('a', { href: '/215/', class: 'design-name' }, 'A Robot Named Jimmy'),
                ' by      ',
                h('a', { href: 'http://meltmedia.com/', class: 'designer-name' }, 'meltmedia')
              ),
              '     ',
              h(
                'li',
                null,
                h('a', { href: '/214/', class: 'design-name' }, 'Verde Moderna'),
                ' by      ',
                h('a', { href: 'http://www.mezzoblue.com/', class: 'designer-name' }, 'Dave Shea')
              ),
              '     '
            )
          )
        ),
        h(
          'div',
          { class: 'design-archives', id: 'design-archives' },
          h('h3', { class: 'archives' }, 'Archives:'),
          h(
            'nav',
            { role: 'navigation' },
            h(
              'ul',
              null,
              h(
                'li',
                { class: 'next' },
                h(
                  'a',
                  { href: '/214/page1' },
                  'Next Designs ',
                  h('span', { class: 'indicator' }, '\u203A')
                )
              ),
              h(
                'li',
                { class: 'viewall' },
                h(
                  'a',
                  {
                    href: 'http://www.mezzoblue.com/zengarden/alldesigns/',
                    title: 'View every submission to the Zen Garden.'
                  },
                  'View All Designs       '
                )
              )
            )
          )
        ),
        h(
          'div',
          { class: 'zen-resources', id: 'zen-resources' },
          h('h3', { class: 'resources' }, 'Resources:'),
          h(
            'ul',
            null,
            h(
              'li',
              { class: 'view-css' },
              h(
                'a',
                {
                  href: '/214/214.css',
                  title: 'View the source CSS file of the currently-viewed design.'
                },
                'View This Design\u2019s ',
                h('abbr', { title: 'Cascading Style Sheets' }, 'CSS'),
                '      '
              )
            ),
            h(
              'li',
              { class: 'css-resources' },
              h(
                'a',
                {
                  href: 'http://www.mezzoblue.com/zengarden/resources/',
                  title: 'Links to great sites with information on using CSS.'
                },
                h('abbr', { title: 'Cascading Style Sheets' }, 'CSS'),
                ' Resources      '
              )
            ),
            h(
              'li',
              { class: 'zen-faq' },
              h(
                'a',
                {
                  href: 'http://www.mezzoblue.com/zengarden/faq/',
                  title: 'A list of Frequently Asked Questions about the Zen Garden.'
                },
                h('abbr', { title: 'Frequently Asked Questions' }, 'FAQ'),
                '      '
              )
            ),
            h(
              'li',
              { class: 'zen-submit' },
              h(
                'a',
                {
                  href: 'http://www.mezzoblue.com/zengarden/submit/',
                  title: 'Send in your own CSS file.'
                },
                'Submit a Design      '
              )
            ),
            h(
              'li',
              { class: 'zen-translations' },
              h(
                'a',
                {
                  href: 'http://www.mezzoblue.com/zengarden/translations/',
                  title: 'View translated versions of this page.'
                },
                'Translations      '
              )
            )
          )
        )
      )
    )
  )
}
