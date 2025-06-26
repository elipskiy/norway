// Initialize services and components
const notesData = StorageService.loadNotes();
const checklistProgress = StorageService.loadChecklist();

const modalComponent = new Modal();
const timelineComponent = new Timeline(tripData, modalComponent);
const checklistComponent = new Checklist(checklistData, checklistProgress);
const budgetComponent = new Budget(budgetData);
const notesComponent = new Notes(notesData, StorageService);

// DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  timelineComponent.render();
  checklistComponent.render();
  budgetComponent.render();
  notesComponent.render();
  timelineComponent.renderHiddenGems();
  NavigationService.showSection(StorageService.loadCurrentSection());
  document.body.classList.add('loaded');
});

// Close modal on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') modalComponent.close();
});

// Outside click
document.getElementById('location-modal').addEventListener('click', e => {
  if (e.target === document.getElementById('location-modal')) modalComponent.close();
});

// PWA service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(r => console.log('SW registered: ', r))
      .catch(err => console.log('SW registration failed: ', err));
  });
}

if (typeof module !== 'undefined') { module.exports = {}; }
