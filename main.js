
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('itinerary-form');
    const output = document.getElementById('itinerary-output');
    const hotelOutput = document.getElementById('hotel-suggestion');
    const airlineOutput = document.getElementById('airline-suggestion');
    const loading = document.getElementById('loading');
    const themeSwitch = document.getElementById('checkbox');

    const destinations = {
        'paris': {
            itinerary: [ /* Itinerary data */ ],
            hotels: [
                { name: 'Le Bristol Paris', type: 'Luxury', description: 'An icon of French elegance, located on the prestigious Rue du Faubourg Saint-Honoré.', url: 'https://www.lebristolparis.com' },
                { name: 'Hôtel de Crillon', type: 'Luxury', description: 'A historic palace hotel on Place de la Concorde with a refined, timeless Parisian experience.', url: 'https://www.hotelcrillon.com' },
                { name: 'Hotel Malte - Astotel', type: 'Mid-Range', description: 'A charming and stylish hotel in the heart of the 2nd arrondissement.', url: 'https://www.hotelmalte.com' },
                { name: 'Generator Paris', type: 'Budget', description: 'A trendy hostel with a rooftop terrace offering stunning views of Montmartre.', url: 'https://www.generatorhostels.com/paris' },
            ],
            airlines: [
                { name: 'Air France', class: 'Economy', price: '$$', description: 'National carrier of France.', url: 'https://www.airfrance.fr' },
                { name: 'Delta Airlines', class: 'Economy', price: '$$', description: 'Major US airline with direct flights.', url: 'https://www.delta.com' },
                { name: 'British Airways', class: 'Business', price: '$$$', description: 'Premium service to Paris.', url: 'https://www.britishairways.com' },
            ]
        },
        'tokyo': {
            itinerary: [ /* Itinerary data */ ],
            hotels: [
                { name: 'Park Hyatt Tokyo', type: 'Luxury', description: 'Famous for its role in \"Lost in Translation,\" offering breathtaking views and impeccable service.', url: 'https://www.hyatt.com/en-US/hotel/japan/park-hyatt-tokyo/tyoph' },
                { name: 'Aman Tokyo', type: 'Luxury', description: 'A serene and luxurious sanctuary with a stunning design, located near the Imperial Palace.', url: 'https://www.aman.com/hotels/aman-tokyo' },
                { name: 'Shibuya Granbell Hotel', type: 'Mid-Range', description: 'A stylish and modern hotel in the heart of Shibuya, perfect for exploring the vibrant district.', url: 'https://www.granbellhotel.jp/shibuya/' },
                { name: 'Book And Bed Tokyo', type: 'Budget', description: 'A unique hostel where you can sleep in a bookshelf, offering a cozy and memorable experience.', url: 'https://bookandbedtokyo.com/' },
            ],
            airlines: [
                { name: 'Japan Airlines (JAL)', class: 'Economy', price: '$$', description: 'National carrier of Japan.', url: 'https://www.jal.com' },
                { name: 'All Nippon Airways (ANA)', class: 'Economy', price: '$$', description: 'Another major Japanese airline.', url: 'https://www.ana.co.jp' },
                { name: 'United Airlines', class: 'Economy', price: '$$', description: 'Major US airline with direct flights.', url: 'https://www.united.com' },
            ]
        }
    };

    const genericActivities = { /* Generic activities data */ };

    const genericHotels = [
        { name: 'Luxury Hotel Option', type: 'Luxury', description: 'For a premium experience, consider a 5-star hotel in the city center with top-tier amenities like a spa, fine dining, and concierge services.', url: 'https://www.luxuryhotels.com' },
        { name: 'Mid-Range Hotel Option', type: 'Mid-Range', description: 'Look for a 3 to 4-star hotel in a well-connected neighborhood. These often provide a great balance of comfort, value, and convenience.', url: 'https://www.midrangehotels.com' },
        { name: 'Budget-Friendly Option', type: 'Budget', description: 'For those traveling on a tighter budget, consider modern hostels, boutique guesthouses, or well-reviewed budget hotels located just outside the main tourist areas.', url: 'https://www.budgethotels.com' },
    ];

    const genericAirlines = [
        { name: 'Global Airways', class: 'Economy', price: '$$', description: 'Offers competitive prices with a wide network.', url: 'https://www.globalairways.com' },
        { name: 'SkyLink Express', class: 'Business', price: '$$$', description: 'Premium services for business travelers.', url: 'https://www.skylinkexpress.com' },
        { name: 'Budget Fly', class: 'Economy', price: '$', description: 'No-frills, affordable flights.', url: 'https://www.budgetfly.com' },
    ];

    const shuffle = (array) => {
        let currentIndex = array.length, randomIndex;
        const newArray = [...array];
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
        }
        return newArray;
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        output.innerHTML = '';
        hotelOutput.innerHTML = '';
        airlineOutput.innerHTML = ''; // Clear airline output
        loading.style.display = 'block';

        setTimeout(() => {
            const destinationInput = document.getElementById('destination').value;
            const destinationKey = destinationInput.toLowerCase();
            const startDate = new Date(document.getElementById('start-date').value);
            const endDate = new Date(document.getElementById('end-date').value);
            const pax = document.getElementById('pax').value;


            if (!destinationInput || !startDate || !endDate || endDate < startDate) {
                alert('Please fill out all fields and ensure the end date is not before the start date.');
                loading.style.display = 'none';
                return;
            }

            console.log(`Generating itinerary for ${pax} person(s).`); // Log the number of pax

            const diffTime = Math.abs(endDate - startDate);
            const duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

            let plan = [];
            const destinationData = destinations[destinationKey];
            let hotelList = genericHotels;
            let airlineList = genericAirlines; // Initialize airlineList

            if (destinationData) {
                const specificItinerary = destinationData.itinerary;
                for (let i = 0; i < duration; i++) {
                    plan.push(specificItinerary[i % specificItinerary.length]);
                }
                hotelList = destinationData.hotels;
                if (destinationData.airlines) {
                    airlineList = destinationData.airlines; // Use specific airlines if available
                }
            } else { 
                const shuffledMornings = shuffle(genericActivities.morning);
                const shuffledAfternoons = shuffle(genericActivities.afternoon);
                const shuffledEvenings = shuffle(genericActivities.evening);

                for (let i = 0; i < duration; i++) {
                    plan.push({
                        morning: `${shuffledMornings[i % shuffledMornings.length]} in ${destinationInput}`,
                        afternoon: shuffledAfternoons[i % shuffledAfternoons.length],
                        evening: shuffledEvenings[i % shuffledEvenings.length],
                    });
                }
            }
            
            hotelOutput.innerHTML = `<h2>Hotel Suggestions</h2><div class="hotel-list">${hotelList.slice(0, 3).map(hotel => `
                <div class="hotel-card">
                    <h3><a href="${hotel.url}" target="_blank"><b>${hotel.name}</b></a> (${hotel.type})</h3>
                    <p>${hotel.description}</p>
                </div>
            `).join('')}</div>`;

            airlineOutput.innerHTML = `<h2>Airline Suggestions</h2><div class="airline-list">${airlineList.slice(0, 3).map(airline => `
                <div class="hotel-card"> <!-- Reusing hotel-card style for consistency -->
                    <h3><a href="${airline.url}" target="_blank"><b>${airline.name}</b></a> (${airline.class})</h3>
                    <p>Price: ${airline.price}</p>
                    <p>${airline.description}</p>
                </div>
            `).join('')}</div>`;

            output.innerHTML = `<h2>Daily Itinerary</h2>${plan.map((dayPlan, i) => {
                const currentDate = new Date(startDate);
                currentDate.setDate(startDate.getDate() + i);
                const dateString = currentDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

                return `
                <div class="itinerary-day-card">
                    <h3>${dateString}</h3>
                    <ul>
                        <li><b>Morning:</b> ${dayPlan.morning}</li>
                        <li><b>Afternoon:</b> ${dayPlan.afternoon}</li>
                        <li><b>Evening:</b> ${dayPlan.evening}</li>
                    </ul>
                </div>
            `}).join('')}`;

            loading.style.display = 'none';
        }, 1000);
    });

    // Populate itinerary data for destinations (to keep the code clean)
    destinations.paris.itinerary = [
        { morning: 'Visit the Louvre Museum', afternoon: 'Climb the Eiffel Tower', evening: 'Seine River Cruise' },
        { morning: 'Explore Montmartre & Sacré-Cœur', afternoon: 'Walk along Champs-Élysées to the Arc de Triomphe', evening: 'Enjoy a show at Moulin Rouge' },
        { morning: 'Day trip to the Palace of Versailles', afternoon: 'Explore the Gardens of Versailles', evening: 'Dinner in the Le Marais district' },
        { morning: 'Visit Musée d\'Orsay', afternoon: 'Stroll through Luxembourg Gardens', evening: 'Explore the Latin Quarter' },
        { morning: 'Discover Sainte-Chapelle & Conciergerie', afternoon: 'Shop at Galeries Lafayette', evening: 'Attend an opera at Palais Garnier' },
    ];
    destinations.tokyo.itinerary = [
        { morning: 'Visit Senso-ji Temple in Asakusa', afternoon: 'Explore Akihabara Electric Town', evening: 'Cross the Shibuya Scramble Crossing' },
        { morning: 'Visit the Meiji Shrine & Yoyogi Park', afternoon: 'Explore Harajuku and Takeshita Street', evening: 'Dinner and drinks in Shinjuku Golden Gai' },
        { morning: 'Explore the Tsukiji Outer Market', afternoon: 'Imperial Palace East Garden', evening: 'Experience teamLab Borderless digital art museum' },
        { morning: 'Day trip to Hakone for views of Mt. Fuji', afternoon: 'Ride the Hakone Ropeway', evening: 'Relax in an onsen (hot spring)' },
        { morning: 'Visit the Ghibli Museum (requires advance tickets)', afternoon: 'Stroll through Inokashira Park', evening: 'Dinner in Kichijoji' },
    ];
    const genericMorning = [
        'Visit a famous landmark or monument',
        'Explore the historic old town center',
        'Take a guided walking tour',
        'Browse a bustling local market',
        'Hike a scenic trail in a nearby park',
    ];
    const genericAfternoon = [
        'Have lunch at a traditional restaurant',
        'Go shopping in a well-known district',
        'Visit a contemporary art gallery',
        'Take a river or harbor boat tour',
    ];
    const genericEvening = [
        'Enjoy fine dining at a renowned restaurant',
        'Watch a show at a historic theater',
        'Experience the nightlife in the city center',
        'Go for a sunset walk along a scenic viewpoint',
    ];
    genericActivities.morning = genericMorning;
    genericActivities.afternoon = genericAfternoon;
    genericActivities.evening = genericEvening;

    // Theme switcher logic
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });

    // Check for saved theme in local storage
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeSwitch.checked = true;
        }
    }
});
