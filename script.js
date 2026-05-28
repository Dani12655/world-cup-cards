const SUPABASE_URL = "const SUPABASE_URL = "https://opycaufmvdwtlosorxte.supabase.co";";
const SUPABASE_KEY = "sb_publishable_bVCJJfENiN6WBFAh0D6ZTA_sgXXqY-i";

let user = null;

async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  user = data;

  document.getElementById("auth").style.display = "none";
  document.getElementById("app").style.display = "block";

  loadCards();
}

async function loadCards() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/cards?select=*`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`
    }
  });

  const cards = await res.json();

  const container = document.getElementById("cards");
  container.innerHTML = "";

  cards.forEach(c => {
    container.innerHTML += `
      <div class="card">
        <h3>${c.player_name}</h3>
        <p>${c.country}</p>
        <p>Stock: ${c.stock}</p>
        <button onclick="markCard(${c.id})">Tenho esta carta</button>
      </div>
    `;
  });
}

async function markCard(cardId) {
  await fetch(`${SUPABASE_URL}/rest/v1/user_cards`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: user.user.id,
      card_id: cardId,
      has_card: true
    })
  });

  alert("Carta marcada!");
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(
    `${SUPABASE_URL}/auth/v1/token?grant_type=password`,
    {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    }
  );

  const data = await res.json();

  if (data.user) {
    window.user = data.user;

    document.getElementById("auth").style.display = "none";
    document.getElementById("app").style.display = "block";

    loadCards();
  } else {
    alert("Erro no login");
  }
}

async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(
    `${SUPABASE_URL}/auth/v1/signup`,
    {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    }
  );

  const data = await res.json();

  if (data.user) {
    alert("Conta criada! Agora faz login.");
  } else {
    alert("Erro ao criar conta");
  }
}
