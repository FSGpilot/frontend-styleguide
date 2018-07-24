---
type: component
title: Pairings and styles
parent: typography
order: 07
---

<p>To support both more contemporary and more traditional web design aesthetics, this font system offers recommended font pairings. Each pairing includes web hierarchy guidance on font family, weight, size, and spacing which express either more modern or more classical type design.</p>
<p>Note: Some pairings require more font weights than others. While this allows more typographic expression, the use of more than four font weights will have a negative impact on page load performance. Find the balance that works for your product.</p>

<ul class="accordion-bordered typography-example">
  <li>
    <button class="accordion-button"
        aria-expanded="false" aria-controls="font-pairing3-docs">
      <h5>IBM Plex Sans headings and body</h5>
    </button>
    <div id="font-pairing3-docs" class="accordion-content">

      <div class="grid-full">
        <div class="width-two-thirds">
          <p>The most formal of the options, this pairing uses Merriweather for both headings and body text. The full suite of serif styles communicates trustworthiness, while Merriweather’s contemporary shapes convey freshness and a modern relevance. The weights are designed to pair together for easy reading and clean page design. Light use of Source Sans Pro suggested for legibility of small text needs.</p>
          <p>Recommended applications: sites which need to convey reliability and trust; basic and text heavy sites.</p>
          <p>Font weights included in this package:</p>
          <ul>
            <li>1. IBM Plex Sans Text, Regular 400</li>
            <li>2. IBM Plex Sans, Regular 400</li>
            <li>3. IBM Plex Sans, medium 500</li>
            <li>4. IBM Plex Sans, Semibold 600</li>
            <li>5. IBM Plex Sans, Bold 700</li>
          </ul>
        </div>
        <aside class="width-one-third end-row">
          <h6 class="heading-alt">Page Performance</h6>
          <p><span class="label-big">Medium</span></p>
          <p>Exceeds ideal number of fonts by one. May negatively impact page load performance.</p>
          <h6 class="heading-alt">Example</h6>
          <p>
            <a class="media_link" href="http://playbook.cio.gov">
              <img src="{{ site.baseurl }}/assets/img/merriweatheronly_example_playbook.png" alt="U.S. Digital Service Playbook example">
            </a>
            <a href="http://playbook.cio.gov">U.S. Digital Service Playbook</a>
          </p>
        </aside>
      </div>
      <h6 class="heading-alt">Web Hierarchy</h6>
      <div class="serif-robust serif-sans-minor serif-body grid typography-example-font">
        <div class="width-one-half">
          <p class="displaytext__splash">Display 1</p>
        </div>
        <div class="width-one-half end-row">
          <p class="monospace">
            font-family: IBMPlexSans<br>
            font-style: Bold <br>
            font-weight: 700<br>
            font-size: 8.0rem/80px<br>
            line-height: 8.8rem/88px<br>
            color: #212121<br>
            <br>
            tag = <code>&lt;p&gt;&lt;/p&gt;</code><br>
            class = <code>.displaytext__splash</code><br>
          </p>
        </div>
        <div class="width-one-half">
          <p class="displaytext__large">Display 2</p>
        </div>
        <div class="width-one-half end-row">
          <p class="monospace">
            font-family: IBMPlexSans<br>
            font-style: Bold <br>
            font-weight: 700<br>
            font-size: 6.0rem/60px<br>
            line-height: 7.2rem/72px<br>
            color: #212121<br>
            <br>
            tag = <code>&lt;p&gt;&lt;/p&gt;</code><br>
            class = <code>.displaytext__large</code><br></p>
        </div>
        <div class="width-one-half">
          <h1>Heading 1</h1>
        </div>
        <div class="width-one-half end-row">
          <p class="monospace">
            font-family: IBMPlexSans<br>
            font-style: Bold<br> 
            font-weight: 700<br>
            font-size: 4.3rem/43px<br>
            line-height: 4.8rem/48px<br>
            color: #1a1a1a<br>
            <br>
            tag = <code>&lt;h1&gt;&lt;/h1&gt;</code><br>
            class = <code>.h1</code><br>
          </p>
          
        </div>
        <div class="width-one-half">
          <h2>Heading 2</h2>
        </div>
        <div class="width-one-half end-row">
          <p class="monospace">
            font-family: ‘IBMPlexSans’<br>
            font-style: normal<br>
            font-weight: 600<br>
            font-size: 3.3rem/33px<br>
            line-height: 4.0rem/40px<br>
            color: #1a1a1a<br>
            <br>
            tag = <code>&lt;h2&gt;&lt;/h2&gt;</code><br>
            class = <code>.h2</code><br>
          </p>
        </div>
        <div class="width-one-half">
          <h3>Heading 3</h3>
        </div>
        <div class="width-one-half end-row">
          <p class="monospace">
            font-family: ‘IBMPlexSans’<br>
            font-style: normal<br>
            font-weight: 600<br>
            font-size: 2.6rem/26px<br>
            line-height: 3.2rem/32px<br>
            color: #1a1a1a<br>
            <br>
            tag = <code>&lt;h3&gt;&lt;/h3&gt;</code><br>
            class = <code>.h3</code><br>
          </p>
        </div>
        <div class="width-one-half">
          <h4>Heading 4</h4>
        </div>
        <div class="width-one-half end-row">
          <p class="monospace">
            font-family: ‘IBMPlexSans’<br>
            font-style: normal<br>
            font-weight: 600<br>
            font-size: 2.2rem/22px<br>
            line-height: 2.4rem/24px<br>
            color: #1a1a1a<br>
            <br>
            tag = <code>&lt;h4&gt;&lt;/h4&gt;</code><br>
            class = <code>.h4</code><br>
          </p>
        </div>
        <div class="width-one-half">
          <h5>Heading 5</h5>
        </div>
        <div class="width-one-half end-row">
          <p class="monospace">
            font-family: ‘IBMPlexSans’<br>
            font-style: normal<br>
            font-weight: 500<br>
            font-size: 2.0rem/20px<br>
            line-height: 2.4rem/24px<br>
            color: #1a1a1a<br>
            <br>
            tag = <code>&lt;h5&gt;&lt;/h5&gt;</code><br>
            class = <code>.h5</code><br>
          </p>
        </div>
        <div class="width-one-half">
          <h6>Heading 6</h6>
        </div>
        <div class="width-one-half end-row">
          <p class="monospace">
            font-family: ‘IBMPlexSans’<br>
            font-style: normal<br>
            font-weight: 600<br>
            font-size: 1.6rem/16px<br>
            line-height: 2.4rem/24px<br>
            color: #1a1a1a<br>
            <br>
            tag = <code>&lt;h6&gt;&lt;/h6&gt;</code><br>
            class = <code>.h6</code><br>
          </p>
        </div>
        <div class="font-example width-one-half">
          <p class="font-lead">Lead paragraph</p>
        </div>
        <div class="width-one-half end-row">
          <p class="monospace">
            font-family: ‘IBMPlexSans’<br>
            font-style: normal<br>
            font-weight: 400<br>
            font-size: 2.5rem/25px<br>
            line-height: 3.2rem/32px<br>
            color: #454545<br>
            <br>
            tag = <code>&lt;p&gt;&lt;/p&gt;</code><br>
            class = <code>.font-lead</code><br>
          </p>
        </div>
        <div class="font-example width-one-half">
          <p class="font-example-paragraph">Body copy</p>
        </div>
        <div class="width-one-half end-row">
          <p class="monospace">
            font-family: ‘IBMPlexSans’<br>
            font-style: normal<br>
            font-weight: 400<br>
            font-size: 1.8rem/18px<br>
            line-height: 2.4rem/24px<br>
            color: #454545<br>
            <br>
            tag = <code>&lt;p&gt;&lt;/p&gt;</code><br>
            class = <code>.body-copy-text</code><br>
          </p>
        </div>
        <div class="font-example width-one-half">
          <em class="font-example-paragraph">Body copy italic</em>
        </div>
        <div class="width-one-half end-row">
          <p class="monospace">
            font-family: ‘IBMPlexSans’<br>
            font-style: Italic<br>
            font-weight: 400<br>
            font-size: 1.8rem/18px<br>
            line-height: 2.4rem/24px<br>
            color: #454545<br>
            <br>
            tag = <code>&lt;em&gt;&lt;/em&gt;</code><br>
            class = <code>.body-copy-text</code><br>
          </p>
        </div>
        <div class="font-example width-one-half">
          <p class="font-example-paragraph bold">Body copy bold</p>
        </div>
        <div class="width-one-half end-row">
          <p class="monospace">
            font-family: ‘IBMPlexSans’<br>
            font-style: normal<br>
            font-weight: 600<br>
            font-size: 1.8rem/18px<br>
            line-height: 2.4rem/24px<br>
            color: #323a44<br>
            <br>
            tag = <code>&lt;p&gt;&lt;/p&gt;</code><br>
            class = <code>.body-copy-text .bold</code><br>
          </p>
        </div>
        <div class="font-example width-one-half">
          <small class="font-example-paragraph small-text">Small text</small>
        </div>
        <div class="width-one-half end-row">
          <p class="monospace">
            font-family: ‘IBMPlexSans’<br>
            font-style: normal<br>
            font-weight: 500<br>
            font-size: 1.4rem/13px<br>
            line-height: 1.6rem/16px<br>
            color: #454545<br>
            <br>
            tag = <code>&lt;small&gt;&lt;/small&gt;</code><br>
            class = <code>.small-text</code><br>
          </p>
        </div>
      </div>
    </div>
  </li>
</ul>
