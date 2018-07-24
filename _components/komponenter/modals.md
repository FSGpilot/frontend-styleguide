---
permalink: /designandcode/modals/
layout: styleguide
type: component
title: Modalvinduer
category: UI components
subcategory: Design og kode
lead: Modals lead.
---

{% include code/preview.html component="modal" %}
{% include code/accordion.html component="modal" %}
<div class="accordion-bordered">
  <button class="button-unstyled accordion-button"
      aria-expanded="true" aria-controls="modal-docs">
    Dokumentation
  </button>
  <div id="modal-docs" aria-hidden="false" class="accordion-content">
    <h4 class="heading">Implementation</h4>
    <p>Modal komponenten er implementeret med scriptet <a href="https://micromodal.now.sh">Micromodal</a>.</p>
    <p>En modal kan åbens ved at sætte følgende attribut på fx en knap: <code>data-micromodal-trigger="modal-id"</code>. Dette vil åbne modalen som har id'et 'modal-id'</p>
    <p>En modal kan lukkes ved at sætte følgende attribut på en knap inde i modalen: <code>data-micromodal-close</code>.</p>
    <p>Det er også muligt at åbne og lukke modalen programmatisk via javascript: <code>MicroModal.show('modal-id');</code> og <code>MicroModal.close('modal-id');</code></p>
    <h6>Html struktur af en modal</h6>
    <ul>
      <li>For at modalen kan åbne skal denne have et id: <code>&lt;div class="modal" id="modal-id" aria-hidden="false"&gt;</code></li>
      <li>Der sættes automatisk fokus på det første fokusbare element i modalen. Luk-knappen skal derfor HTML-mæssigt placeres til sidste i modalen.</li>
      <li>En modal er opdelt i tre dele: modal__header, modal__content og modal__footer</li>
    </ul>
  </div>
</div>
