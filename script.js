const ships = [
    {
        id: 1,
        name: "Галактический Исследователь",
        type: "Исследовательский",
        manufacturer: "StarTech Corporation",
        price: 1500,
        image: "images/issled.jpg",
        passengers: 6,
        speed: 8,
        description: "Идеальный корабль для межгалактических исследований. Оснащен современными сканерами, научной лабораторией и системой жизнеобеспечения длительного действия. Идеально подходит для исследовательских миссий.",
        features: ["Автопилот", "Система жизнеобеспечения", "Исследовательский модуль", "Защитный щит", "Сканеры дальнего действия", "Навигационная система"],
        available: true
    },
    {
        id: 2,
        name: "Космический Люкс",
        type: "Люкс",
        manufacturer: "SpaceLux Interstellar",
        price: 3000,
        image: "images/luks.jpg",
        passengers: 4,
        speed: 9,
        description: "Роскошный корабль для комфортных путешествий. Включает спа-зону, бар с экзотическими напитками, кинотеатр с голографическим экраном и искусственную гравитацию. Для самых взыскательных путешественников.",
        features: ["Спа-зона", "Кинотеатр", "Бар", "Искусственная гравитация", "Консьерж-сервис", "Голографический интерьер"],
        available: true
    },
    {
        id: 3,
        name: "Грузовой Перевозчик",
        type: "Грузовой",
        manufacturer: "CargoSpace Logistics",
        price: 2000,
        image: "images/gryz.jpg",
        passengers: 2,
        speed: 5,
        description: "Надежный корабль для перевозки грузов между планетами. Большой грузовой отсек объемом 5000 м³, усиленные двигатели и система погрузки. Идеален для коммерческих перевозок.",
        features: ["Большой грузовой отсек", "Манипуляторы", "Система погрузки", "Усиленная защита", "Стабилизаторы груза", "Тяжелые двигатели"],
        available: true
    },
    {
        id: 4,
        name: "Звездный Истребитель",
        type: "Боевой",
        manufacturer: "MilitaryCorp Defense",
        price: 4000,
        image: "images/boevoi.jpg",
        passengers: 1,
        speed: 10,
        description: "Современный боевой корабль с мощным вооружением. Быстрый и маневренный, оснащен лазерными пушками, ракетными установками и системой невидимости. Для защитных миссий.",
        features: ["Лазерные пушки", "Ракетные установки", "Система невидимости", "Автономный полет", "Боевые щиты", "Высокая маневренность"],
        available: true
    },
    {
        id: 5,
        name: "Пассажирский Лайнер",
        type: "Пассажирский",
        manufacturer: "SpaceLines Travel",
        price: 2500,
        image: "images/passa.jpg",
        passengers: 12,
        speed: 6,
        description: "Вместительный корабль для групповых путешествий. Комфортные условия для всех пассажиров: большие каюты, общая зона отдыха, питание включено. Отлично подходит для туристических групп.",
        features: ["Большие каюты", "Общая зона", "Питание включено", "Развлекательная система", "Медблок", "Просторные салоны"],
        available: true
    },
    {
        id: 6,
        name: "Научный Модуль",
        type: "Научный",
        manufacturer: "ScienceLab Research",
        price: 1800,
        image: "images/naych.jpg",
        passengers: 3,
        speed: 4,
        description: "Специализированный корабль для научных исследований. Оснащен уникальным оборудованием: телескопами, аналитическими системами и расширенной базой данных. Для ученых и исследователей.",
        features: ["Научная лаборатория", "Телескопы", "Аналитическое оборудование", "База данных", "Образцы хранения", "Измерительные приборы"],
        available: true
    }
];

// DOM элементы
let shipsGrid, modalOverlay, modal, modalClose;
let modalImage, modalTitle, modalBadges, modalDescription;
let featuresList, statPassengers, statSpeed, statPrice, bookButton;

// Текущий выбранный корабль
let selectedShip = null;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    // Получаем элементы DOM
    shipsGrid = document.getElementById('shipsGrid');
    modalOverlay = document.getElementById('modalOverlay');
    modal = document.getElementById('modal');
    modalClose = document.getElementById('modalClose');
    modalImage = document.getElementById('modalImage');
    modalTitle = document.getElementById('modalTitle');
    modalBadges = document.getElementById('modalBadges');
    modalDescription = document.getElementById('modalDescription');
    featuresList = document.getElementById('featuresList');
    statPassengers = document.getElementById('statPassengers');
    statSpeed = document.getElementById('statSpeed');
    statPrice = document.getElementById('statPrice');
    bookButton = document.getElementById('bookButton');

    // Загружаем корабли
    loadShips();

    // Настраиваем обработчики событий
    setupEventListeners();
});

// Загрузка кораблей в сетку
function loadShips() {
    shipsGrid.innerHTML = '';

    ships.forEach(ship => {
        const shipCard = createShipCard(ship);
        shipsGrid.appendChild(shipCard);
    });
}

// Создание карточки корабля
function createShipCard(ship) {
    const card = document.createElement('div');
    card.className = 'ship-card';
    card.dataset.id = ship.id;

    // Определяем класс типа для стилизации
    const typeClass = getTypeClass(ship.type);

    card.innerHTML = `
        <div class="ship-image">
            <img src="${ship.image}" alt="${ship.name}" loading="lazy">
            <div class="ship-price">$${ship.price}/день</div>
            ${!ship.available ? '<div class="ship-unavailable">ЗАБРОНИРОВАН</div>' : ''}
        </div>
        <div class="ship-info">
            <div class="ship-header">
                <h3 class="ship-name">${ship.name}</h3>
                <span class="ship-type ${typeClass}">${ship.type}</span>
            </div>
            <p class="ship-manufacturer">${ship.manufacturer}</p>
            <p class="ship-description">${ship.description.substring(0, 100)}...</p>
            <div class="ship-stats">
                <div class="ship-stat">
                    <i class="fas fa-users"></i>
                    <span>${ship.passengers} пасс.</span>
                </div>
                <div class="ship-stat">
                    <i class="fas fa-bolt"></i>
                    <span>${ship.speed}/10</span>
                </div>
                <div class="ship-stat">
                    <i class="fas ${ship.available ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                    <span>${ship.available ? 'Доступен' : 'Занят'}</span>
                </div>
            </div>
            <button class="btn-details" ${!ship.available ? 'disabled' : ''}>
                ${ship.available ? 'Посмотреть детали' : 'Недоступен'}
            </button>
        </div>
    `;

    // Добавляем обработчик клика
    const detailsButton = card.querySelector('.btn-details');
    detailsButton.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(ship);
    });

    // Также открываем по клику на всю карточку (только если доступен)
    if (ship.available) {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('btn-details')) {
                openModal(ship);
            }
        });
    }

    return card;
}

// Получение класса CSS для типа корабля
function getTypeClass(type) {
    const typeMap = {
        'Исследовательский': 'explorer',
        'Люкс': 'luxury',
        'Грузовой': 'cargo',
        'Боевой': 'combat',
        'Пассажирский': 'passenger',
        'Научный': 'science'
    };
    return typeMap[type] || 'explorer';
}

// Открытие модального окна
function openModal(ship) {
    selectedShip = ship;

    // Устанавливаем данные корабля в модальное окно
    modalImage.style.backgroundImage = `url('${ship.image}')`;
    modalTitle.textContent = ship.name;
    modalDescription.textContent = ship.description;

    // Устанавливаем бейджи
    modalBadges.innerHTML = `
        <span class="modal-badge badge-type">${ship.type} КЛАСС</span>
        <span class="modal-badge ${ship.available ? 'badge-available' : 'badge-unavailable'}">
            ${ship.available ? 'ДОСТУПЕН' : 'ЗАНЯТ'}
        </span>
    `;

    // Устанавливаем особенности
    featuresList.innerHTML = '';
    ship.features.forEach(feature => {
        const featureItem = document.createElement('div');
        featureItem.className = 'feature-item';
        featureItem.innerHTML = `<i class="fas fa-check"></i><span>${feature}</span>`;
        featuresList.appendChild(featureItem);
    });

    // Устанавливаем статистику
    statPassengers.textContent = ship.passengers;
    statSpeed.textContent = `${ship.speed}/10`;
    statPrice.textContent = `$${ship.price}`;

    // Настраиваем кнопку бронирования
    bookButton.disabled = !ship.available;
    bookButton.textContent = ship.available ? 'Забронировать сейчас' : 'Корабль недоступен';
    if (ship.available) {
        bookButton.onclick = bookShip;
    } else {
        bookButton.onclick = null;
    }

    // Показываем модальное окно
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Закрытие модального окна
function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    selectedShip = null;
}

// Бронирование корабля
function bookShip() {
    if (!selectedShip || !selectedShip.available) return;

    // Здесь можно добавить логику бронирования
    // Например, отправку на сервер или открытие формы

    alert(`Вы забронировали корабль "${selectedShip.name}"!\n\nСтоимость: $${selectedShip.price} в день\n\nНаш менеджер свяжется с вами для подтверждения.`);

    // Обновляем статус корабля (в реальном приложении это делается на сервере)
    selectedShip.available = false;

    // Закрываем модальное окно и обновляем сетку
    closeModal();
    loadShips();
}

// Настройка обработчиков событий
function setupEventListeners() {
    // Закрытие модального окна по кнопке
    modalClose.addEventListener('click', closeModal);

    // Закрытие модального окна по клику на оверлей
    modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Закрытие модального окна по клавише ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Обработка кнопки "Контакты"
    document.querySelector('.btn-contact').addEventListener('click', function () {
        alert('Свяжитесь с нами:\n\nТелефон: +7 (999) 123-45-67\nEmail: info@galaxyrent.com\nАдрес: Звездная улица, 42, Москва');
    });
}