export const featured = [
  {
    title: 'Featured',
    description: 'Popular restaurants',
    restaurants: [
      {
        id: 1,
        name: 'Pizza Hut',
        image: require('../assets/images/pizza-hut.jpg'),
        stars: 4.3,
        reviews: 120,
        category: 'Pizza',
        address: '123 Main St',
        menu: [
          {
            id: 1,
            name: 'Garlic Crust Pizza',
            description: 'Cheesy garlic crust with oregano',
            price: 12,
            image: require('../assets/images/pizzaDish.png'),
          },
          {
            id: 2,
            name: 'Pepperoni Pizza',
            description: 'Classic pepperoni with mozzarella',
            price: 14,
            image: require('../assets/images/image1.png'),
          },
          {
            id: 3,
            name: 'Margherita Pizza',
            description: 'Fresh basil, tomato, and mozzarella',
            price: 11,
            image: require('../assets/images/image2.png'),
          },
        ],
      },
      {
        id: 2,
        name: 'Domino’s Pizza',
        image: require('../assets/images/dominos.jpg'),
        stars: 4.5,
        reviews: 150,
        category: 'Pizza',
        address: '456 Oak Ave',
        menu: [
          {
            id: 4,
            name: 'BBQ Chicken Pizza',
            description: 'Grilled chicken with BBQ sauce',
            price: 13,
            image: require('../assets/images/image1.png'),
          },
          {
            id: 5,
            name: 'Veggie Supreme Pizza',
            description: 'Mixed vegetables with mozzarella',
            price: 12,
            image: require('../assets/images/image2.png'),
          },
          {
            id: 1,
            name: 'Garlic Crust Pizza',
            description: 'Cheesy garlic crust with oregano',
            price: 12,
            image: require('../assets/images/image3.png'),
          },
        ],
      },
    ],
  },
  {
    title: 'Top Picks',
    description: 'Highly rated restaurants',
    restaurants: [
      {
        id: 3,
        name: 'Cosa Nostra',
        image: require('../assets/images/cosa-nostra.jpg'),
        stars: 4.7,
        reviews: 200,
        category: 'Italian',
        address: '789 Pine Rd',
        menu: [
          {
            id: 6,
            name: 'Spaghetti Carbonara',
            description: 'Creamy sauce with pancetta and parmesan',
            price: 15,
            image: require('../assets/images/image1.png'),
          },
          {
            id: 7,
            name: 'Lasagna',
            description: 'Layered pasta with meat and béchamel',
            price: 16,
            image: require('../assets/images/image2.png'),
          },
          {
            id: 8,
            name: 'Tiramisu',
            description: 'Classic Italian coffee dessert',
            price: 8,
            image: require('../assets/images/image3.png'),
          },
        ],
      },
    ],
  },
];

export const categories = [
  {
    id: '1',
    name: 'Pizza',
    image: require('../assets/images/pizzaIcon.png'),
    screen: 'Pizza'
  },
  {
    id: '2',
    name: 'Burger',
    image: require('../assets/images/burgerIcon.png'),
    screen: 'Burger'
  },
  {
    id: '3',
    name: 'Italian',
    image: require('../assets/images/italianIcon.png'),
    screen: 'ItalianFood'
  },
  {
    id: '4',
    name: 'Chinese',
    image: require('../assets/images/chineseIcon.png'),
    screen: 'Chinese'
  },
  
  {
    id: '5',
    name: 'Sweets',
    image: require('../assets/images/sweetsIcon.png'),
    screen: 'Sweets'
  },
];

export const dishes = [
  {
    id: 1,
    name: 'Garlic Crust Pizza',
    description: 'Cheesy garlic crust with oregano',
    price: 12,
    image: require('../assets/images/pizzaDish.png'),
  },
  {
    id: 2,
    name: 'Pepperoni Pizza',
    description: 'Classic pepperoni with mozzarella',
    price: 14,
    image: require('../assets/images/image1.png'),
  },
  {
    id: 3,
    name: 'Margherita Pizza',
    description: 'Fresh basil, tomato, and mozzarella',
    price: require('../assets/images/image2.png'),
  },
  {
    id: 4,
    name: 'BBQ Chicken Pizza',
    description: 'Grilled chicken with BBQ sauce',
    price: 13,
    image: require('../assets/images/image3.png'),
  },
  {
    id: 5,
    name: 'Veggie Supreme Pizza',
    description: 'Mixed vegetables with mozzarella',
    price: 12,
    image: require('../assets/images/image1.png'),
  },
  {
    id: 6,
    name: 'Spaghetti Carbonara',
    description: 'Creamy sauce with pancetta and parmesan',
    price: 15,
    image: require('../assets/images/image2.png'),
  },
  {
    id: 7,
    name: 'Lasagna',
    description: 'Layered pasta with meat and béchamel',
    price: 16,
    image: require('../assets/images/image3.png'),
  },
  {
    id: 8,
    name: 'Tiramisu',
    description: 'Classic Italian coffee dessert',
    price: 8,
    image: require('../assets/images/image1.png'),
  },
];