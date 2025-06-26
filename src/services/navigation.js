const NavigationService = {
  showSection(sectionName) {
    document.querySelectorAll('.section').forEach(sec => sec.classList.add('hidden'));
    document.getElementById(sectionName).classList.remove('hidden');
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    event.target && event.target.classList.add('active');
    localStorage.setItem('norwayTripCurrentSection', sectionName);
  },
};

if (typeof module !== 'undefined') { module.exports = { NavigationService }; }
