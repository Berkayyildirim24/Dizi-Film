$(document).ready(function() {
    var savedCards = JSON.parse(localStorage.getItem('savedCards')) || [];

    savedCards.forEach(function(cardData) {
        var cardHtml = `
            <div class="card mb-3" id="${cardData.id}">
                <div class="card-body">
                    ${cardData.html}
                    <button class="btn btn-danger delete-button" data-card-id="${cardData.id}">Sil</button>
                </div>
            </div>
        `;
        $('#targetContainer').append(cardHtml);
    });

    $(document).on('click', '.delete-button', function() {
        var cardId = $(this).data('card-id');
        $('#' + cardId).remove();
        
        savedCards = savedCards.filter(card => card.id !== cardId);
        localStorage.setItem('savedCards', JSON.stringify(savedCards));
    });
});
