const SUPABASE_URL = 'https://opycaufmvdwtlosorxte.supabase.co';
const SUPABASE_KEY = 'sb_publishable_D-yNW7TQbREFuKwvqhKXWQ_i11zDYqF';

async function loadCards() {

  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/cards?select=*`,
    {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    }
  );

  const data = await res.json();

  showCards(data);
}

function showCards(cards) {

  const container = document.getElementById('cards-container');

  container.innerHTML = '';

  cards.forEach(c => {
    container.innerHTML += `
      <div class="card">
        <h2>${c.player_name}</h2>
        <p>${c.country}</p>
        <p>Stock: ${c.stock}</p>
        <p>€${c.price}</p>
      </div>
    `;
  });
}

loadCards();
