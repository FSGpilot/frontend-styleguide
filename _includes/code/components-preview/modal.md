--- 
permalink: /preview-components/modal.html
layout: iframed 
title: Modal.html
---
<div class="container">
    <button class="button button-primary" data-micromodal-trigger="modal-active">Åben modal (aktiv)</button>
    <br>
    <br>
    <button class="button button-primary" data-micromodal-trigger="modal-passive">Åben modal (passive)</button>
    <div class="styleguide-spacer-modals"></div>
</div>

<div class="modal" id="modal-active" aria-hidden="true">
    <div class="modal__overlay bg-modal" tabindex="-1" data-micromodal-close>
        <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-title-1">
            <header class="modal__header">
                <h1 class="modal__title h2" id="modal-title-1">
                    Modal
                </h1>
            </header>
            <main class="modal__content">
                <p>Modalens indhold. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
            </main>

            <footer class="modal__footer">
                <button class="button button-primary" aria-label="Fx bekræft handling">Primærknap</button>
                <button class="button button-secondary" data-micromodal-close
                    aria-label="Fx lukker modal vinduet">Sekundærknap</button>
            </footer>

            <button class="modal__close button button-ghost" aria-label="Close modal" data-micromodal-close>Luk</button>
        </div>
    </div>
</div>

<div class="modal" id="modal-passive" aria-hidden="true">
    <div class="modal__overlay bg-modal" tabindex="-1" data-micromodal-close>
        <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-title-2">
            <header class="modal__header">
                <h1 class="modal__title h2" id="modal-title-2">
                    Modal
                </h1>
            </header>
            <main class="modal__content">
                <p>Modalens indhold. Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
            </main>

            <button class="modal__close button button-ghost" aria-label="Close modal" data-micromodal-close>Luk</button>
        </div>
    </div>
</div>