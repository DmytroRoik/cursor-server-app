exports.seed = function (knex, Promise) {
    return knex('icons').insert([
      { id: 1, class: 'fa-hamburger' },
      { id: 2, class: 'fa-utensils' },
      { id: 3, class: 'fa-dumbbell' },
      { id: 4, class: 'fa-train' },
      { id: 5, class: 'fa-briefcase-medical' },
      { id: 6, class: 'fa-paint-roller' },
      { id: 7, class: 'fa-theater-masks' },
      { id: 8, class: 'fa-wine-glass' },
      { id: 9, class: 'fa-smoking' },
      { id: 10, class: 'fa-paw' }
    ])
  }
  