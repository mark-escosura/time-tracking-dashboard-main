const daily = document.getElementById('daily');
const weekly = document.getElementById('weekly');
const monthly = document.getElementById('monthly');
const periods = document.querySelectorAll('h2');

const periodicity = [daily, weekly, monthly];
const activities = ['work', 'play', 'study', 'exercise', 'social', 'self-care'];

// run functions here
setColor();
fetchData();

/**
 * @desc set color according to which period is "clicked"
 */

function setColor() {
  periods.forEach((period) => {
    period.addEventListener('click', () => {
      periods.forEach((item) => {
        item.style.color = 'hsl(235, 45%, 61%)';
      });
      period.style.color = 'hsl(236, 100%, 87%)';
    });
  });
}

/**
 * @desc Fetch Data according to which period is "clicked"
 * */

function fetchData() {
  fetch('./data.json')
    .then((response) => response.json())
    .then((data) =>
      periodicity.forEach((period) => {
        period.addEventListener('click', () => {
          for (let i = 0; i < activities.length; i++) {
            // current hours
            const currentHours = document.querySelector(
              `.${activities[i]}-current-hours`
            );
            // prev hours
            const prevHours = document.querySelector(
              `.${activities[i]}-prev-hours`
            );
            if (period === daily) {
              currentHours.textContent = data[i].timeframes.daily.current;
              prevHours.textContent = data[i].timeframes.daily.previous;
            } else if (period === weekly) {
              currentHours.textContent = data[i].timeframes.weekly.current;
              prevHours.textContent = data[i].timeframes.weekly.previous;
            } else {
              currentHours.textContent = data[i].timeframes.monthly.current;
              prevHours.textContent = data[i].timeframes.monthly.previous;
            }
          }
        });
      })
    );
}
