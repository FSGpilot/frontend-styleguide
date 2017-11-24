--- 
permalink: /preview-components/datatable.html
layout: base 
title: Datatable.html
---

<div class="dt-container">
  <section class="dt-menu">
    <div class="dt-selected-rows-menu dt-hidden">
      <button class="dt-button" type="button">
        Action1
        <svg class="dt-button-img">
          <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm4 9H9v3H7V9H4V7h3V4h2v3h3v2z"></path>
        </svg>
      </button>
      <button class="dt-button" type="button">
        Action2
        <svg class="dt-button-img">
          <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm4 9H9v3H7V9H4V7h3V4h2v3h3v2z"></path>
        </svg>
      </button>
      <button class="dt-button" type="button">
        Action3
        <svg class="dt-button-img">
          <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm4 9H9v3H7V9H4V7h3V4h2v3h3v2z"></path>
        </svg>
      </button>
      <div class="dt-selected-items-counter">
        <span class="dt-selected-items-counter-value"></span>
        <span> items selected</span>
      </div>
      <button class="dt-cancel-button" type="button">
        Cancel
      </button>
    </div>
    <div class="dt-default-menu">
      <input type="text" class="dt-filter">
      <button class="dt-button">
        <svg class="dt-button-img">
          <path d="M8 9V2H6.1v7L3.5 6.5 2 8l5 5 5-5-1.5-1.5L8 9z" />
          <path d="M13 12v3H1v-3h-2v6h16v-6h-2z" />
        </svg>
      </button>
      <button class="dt-button">
        <svg class="dt-button-img">
          <path d="M2.032 10.924l7.99-7.99 2.97 2.97-7.99 7.99zM11.046 2.014l1.98-1.98 2.97 2.97-1.98 1.98zM0 16l3-1-2-2z"></path>
        </svg>
      </button>
      <button class="dt-button">
        <svg class="dt-button-img">
          <path d="M13.1 10c0-.3 0-.6-.1-1l2-1.7-1.7-2.7-2.3.8c-.6-.5-1.2-.9-1.9-1.1L8.6 2H5.4l-.5 2.2c-.7.3-1.4.7-1.9 1.2L.7 4.6-1 7.3.9 9c0 .3-.1.6-.1 1s0 .6.1 1L-1 12.7l1.7 2.7 2.3-.8c.6.5 1.2.9 1.9 1.1l.5 2.3h3.2l.5-2.2c.7-.3 1.3-.6 1.9-1.1l2.3.8 1.7-2.7-1.9-1.8v-1zM7 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"
          />
        </svg>
      </button>
    </div>
  </section>

  <table class="dt-table">
    <thead>
      <tr>
        <th></th>
        <th>
          <button class="dt-sort-button">
            <span>Document title</span>
            <svg class="dt-sort-button-svg dt-hidden">
              <path d="M10 0L5 5 0 0z"></path>
            </svg>
          </button>
        </th>
        <th>
          <button class="dt-sort-button">
            <span>Description</span>
            <svg class="dt-sort-button-svg dt-hidden">
              <path d="M10 0L5 5 0 0z"></path>
            </svg>
          </button>
        </th>
        <th>
          <button class="dt-sort-button">
            <span>Year</span>
            <svg class="dt-sort-button-svg dt-hidden">
              <path d="M10 0L5 5 0 0z"></path>
            </svg>
          </button>
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <input type="checkbox" class="dt-checkbox">
        </td>
        <td scope="row">Declaration of Independence</td>
        <td>Statement adopted by the Continental Congress declaring independence from the British Empire.</td>
        <td>1776</td>
        <td>
          <div class="overflow-menu">
            <button class="overflow-menu-btn">
              <svg class="overflow-menu-svg" width="4" height="20" viewBox="0 0 4 20" fill-rule="evenodd">
                <circle cx="2" cy="2" r="2"></circle>
                <circle cx="2" cy="10" r="2"></circle>
                <circle cx="2" cy="18" r="2"></circle>
              </svg>
            </button>
            <div class="overflow-menu-options">
              <button class="overflow-menu-options-btn">Option 1</button>
              <button class="overflow-menu-options-btn">Option 2</button>
              <button class="overflow-menu-options-btn">Option 3</button>
              <button class="overflow-menu-options-btn">Option 4 is longer text</button>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <input type="checkbox" class="dt-checkbox">
        </td>
        <td>Bill of Rights</td>
        <td>The first ten amendments of the U.S. Constitution guaranteeing rights and freedoms.</td>
        <td>1791</td>
        <td>
          <div class="overflow-menu">
            <button class="overflow-menu-btn">
              <svg class="overflow-menu-svg" width="4" height="20" viewBox="0 0 4 20" fill-rule="evenodd">
                <circle cx="2" cy="2" r="2"></circle>
                <circle cx="2" cy="10" r="2"></circle>
                <circle cx="2" cy="18" r="2"></circle>
              </svg>
            </button>
            <div class="overflow-menu-options">
              <button class="overflow-menu-options-btn">Option 5</button>
              <button class="overflow-menu-options-btn">Option 6 is longer text</button>
              <button class="overflow-menu-options-btn">Option 7</button>
              <button class="overflow-menu-options-btn">Option 8</button>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <input type="checkbox" class="dt-checkbox">
        </td>
        <td>Declaration of Sentiments</td>
        <td>A document written during the Seneca Falls Convention outlining the rights that American women should be entitled
          to as citizens.</td>
        <td>1848</td>
        <td>
          <div class="overflow-menu">
            <button class="overflow-menu-btn">
              <svg class="overflow-menu-svg" width="4" height="20" viewBox="0 0 4 20" fill-rule="evenodd">
                <circle cx="2" cy="2" r="2"></circle>
                <circle cx="2" cy="10" r="2"></circle>
                <circle cx="2" cy="18" r="2"></circle>
              </svg>
            </button>
            <div class="overflow-menu-options">
              <button class="overflow-menu-options-btn">Option 1</button>
              <button class="overflow-menu-options-btn">Option 2</button>
              <button class="overflow-menu-options-btn">Option 3</button>
              <button class="overflow-menu-options-btn">Option 4 is longer text</button>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td>
          <input type="checkbox" class="dt-checkbox">
        </td>
        <td>Emancipation Proclamation</td>
        <td>An executive order granting freedom to slaves in designated southern states.</td>
        <td>1863</td>
        <td>
          <div class="overflow-menu">
            <button class="overflow-menu-btn">
              <svg class="overflow-menu-svg" width="4" height="20" viewBox="0 0 4 20" fill-rule="evenodd">
                <circle cx="2" cy="2" r="2"></circle>
                <circle cx="2" cy="10" r="2"></circle>
                <circle cx="2" cy="18" r="2"></circle>
              </svg>
            </button>
            <div class="overflow-menu-options">
              <button class="overflow-menu-options-btn">Option 1</button>
              <button class="overflow-menu-options-btn">Option 2</button>
              <button class="overflow-menu-options-btn">Option 3</button>
              <button class="overflow-menu-options-btn">Option 4 is longer text</button>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>