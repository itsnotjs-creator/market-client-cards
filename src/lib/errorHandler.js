import Swal from 'sweetalert2';

const ERROR_MESSAGES = {
  400: 'Solicitud inválida',
  401: 'No autorizado. Por favor inicia sesión.',
  403: 'Acceso denegado',
  404: 'Recurso no encontrado',
  409: 'Conflicto: el recurso ya existe',
  422: 'Datos inválidos',
  429: 'Demasiadas solicitudes. Intenta más tarde.',
  500: 'Error del servidor',
  502: 'Servidor no disponible',
  503: 'Servicio no disponible',
};

const getErrorMessage = (error) => {
  if (error?.status && ERROR_MESSAGES[error.status]) {
    return ERROR_MESSAGES[error.status];
  }

  if (error?.payload?.message) {
    return Array.isArray(error.payload.message)
      ? error.payload.message.join(', ')
      : error.payload.message;
  }

  if (error?.message) {
    return error.message;
  }

  return 'Ocurrió un error inesperado';
};

export const showError = (error) => {
  const message = getErrorMessage(error);

  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
    confirmButtonColor: '#0d2240',
    confirmButtonText: 'Entendido',
  });
};

export const showSuccess = (message, title = 'Éxito') => {
  Swal.fire({
    icon: 'success',
    title,
    text: message,
    confirmButtonColor: '#0d2240',
    confirmButtonText: 'OK',
    timer: 3000,
    timerProgressBar: true,
  });
};

export const showWarning = (message, title = 'Advertencia') => {
  Swal.fire({
    icon: 'warning',
    title,
    text: message,
    confirmButtonColor: '#0d2240',
    confirmButtonText: 'Entendido',
  });
};

export const showConfirmation = (message, title = '¿Estás seguro?') => {
  return Swal.fire({
    icon: 'warning',
    title,
    text: message,
    showCancelButton: true,
    confirmButtonColor: '#0d2240',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Sí, continuar',
    cancelButtonText: 'Cancelar',
  });
};

export const showLoading = (message = 'Procesando...') => {
  Swal.fire({
    title: message,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const closeLoading = () => {
  Swal.close();
};

export const handleApiError = (error) => {
  console.error('[API Error]', error);

  if (error?.status === 401) {
    showError(error);
    if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
    return;
  }

  if (error?.status === 403) {
    showError(error);
    return;
  }

  showError(error);
};
