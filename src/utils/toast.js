// Toast notification utility

let toastContainer = null;

const getToastContainer = () => {
  if (!toastContainer) {
    toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'toast-container';
      toastContainer.className = 'fixed top-4 right-4 z-50 flex flex-col gap-2';
      document.body.appendChild(toastContainer);
    }
  }
  return toastContainer;
};

const showToast = (message, type = 'info', duration = 3000) => {
  const container = getToastContainer();
  const toast = document.createElement('div');
  
  const bgColor = {
    success: 'bg-success bg-opacity-20 border border-success',
    danger: 'bg-danger bg-opacity-20 border border-danger',
    warning: 'bg-warning bg-opacity-20 border border-warning',
    info: 'bg-accent bg-opacity-20 border border-accent',
  }[type];
  
  const textColor = {
    success: 'text-success',
    danger: 'text-danger',
    warning: 'text-warning',
    info: 'text-accent',
  }[type];
  
  toast.className = `${bgColor} ${textColor} px-4 py-3 rounded-lg backdrop-blur-sm animate-slide max-w-xs`;
  toast.textContent = message;
  
  container.appendChild(toast);
  
  if (duration > 0) {
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
  
  return () => toast.remove();
};

export const Toast = {
  success: (message) => showToast(message, 'success'),
  error: (message) => showToast(message, 'danger'),
  warning: (message) => showToast(message, 'warning'),
  info: (message) => showToast(message, 'info'),
};
