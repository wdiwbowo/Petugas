import axios from 'axios';

// Membuat instance axios dengan konfigurasi default
const apiUrl = 'https://api-sso.lskk.co.id/v1/';
const api = 'https://api-iot-log.lskk.co.id/v1';

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
const apiAdminFile = axios.create({
  baseURL: api,
  headers: {
    'Content-Type': 'application/json',
  },
});

const guidAplication = 'PROJECT-519391a1-bff6-4e8c-a854-bed3984cc0bb-2024'

// Menambahkan interceptor untuk menyertakan token atau menangani kesalahan
apiClient.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiAdminFile.interceptors.request.use(
  (config) => {
    const appToken = localStorage.getItem('appToken');
    if (appToken) {
      config.headers.Authorization = `Bearer ${appToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Fungsi untuk GET request
export const fetchData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        // Opsional: tangani penyegaran token atau alihkan ke login
      }
    }
    throw error;
  }
};

// Fungsi untuk POST request dengan JSON
export const postData = (endpoint, data, contentType = 'application/json') => {
  return apiClient.post(endpoint, data, {
    headers: {
      'Content-Type': contentType,
    },
  });
};

// Fungsi untuk POST request dengan x-www-form-urlencoded
export const postFormData = (endpoint, data) => {
  return apiClient.post(endpoint, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
};

// Fungsi login
export const login = async (email, password) => {
  try {
    const response = await apiClient.post('/users/login', {
      email,
      password,
      guidAplication,
    });
    const { token } = response.data;
    if (token) {
      localStorage.setItem('userToken', token); // Simpan token di localStorage
    } 
    return response;
  } catch (error) {
    throw error;
  }
};

export const checkEmail = async (email) => {
  try {
    const response = await axios.post(`${baseURL}/check-email`, { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fungsi untuk pendaftaran
export const register = (data) => {
  return apiClient.post('/users/register', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getAllCompanies = async () => {
  try {
    const response = await apiClient.get('/companies');
    return response.data?.data || []; // Access and return the companies array, default to empty array
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch companies');
  }
};

// Fungsi logout
export const logout = () => {
  localStorage.removeItem('userToken');
};

// Fungsi untuk mengaktifkan akun dengan OTP
export const activateAccount = async (email, otp) => {
  try {
    const response = await apiClient.post('/users/activate', {
      email,
      otp,
      guidAplication, 
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error('Unauthorized access. Please log in again.');
      }
      throw new Error(`Error ${error.response.status}: ${error.response.statusText}`);
    } else {
      throw new Error('Failed to activate account. Please try again.');
    }
  }
};

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/users/profile');
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        throw new Error('Unauthorized access. Please log in again.');
      }
      throw new Error(`Error ${error.response.status}: ${error.response.statusText}`);
    } else {
      throw new Error('Failed to fetch profile. Please try again.');
    }
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    const response = await apiClient.post(
      '/users/edit-profile',
      {
        newName: profileData.name,
        newPhoneNumber: profileData.phoneNumber,
        newAddress: profileData.address || '' // Kirimkan alamat kosong jika tidak ada
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePassword = async (email, currentPassword, newPassword) => {
  try {
    const response = await apiClient.post('/users/edit-password', {
      email,
      currentPassword,
      newPassword
    });

    if (response.data && response.data.success) {
      return {
        success: true,
        message: 'Password updated successfully.',
        data: response.data
      };
    } else {
      return {
        success: false,
        message: response.data.message || 'Failed to update password.'
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'An error occurred while updating the password.'
    };
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await apiClient.post('/users/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addReport = async (formData) => {
  try {
    const appToken = localStorage.getItem('appToken');
    
    if (!appToken) {
        throw new Error('Authorization token not found. Please log in again.');
    }

    const response = await apiAdminFile.post('/reports/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${appToken}` // Use appToken from localStorage
        }
    });

    return response.data; // Return response data

  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Failed to add report';
    throw new Error(errorMessage);
  }
};

// Fungsi untuk mengambil laporan petugas (officer reports)
export const getPetugasReports = async (queryParams) => {
  try {
    const response = await apiAdminFile.get('/reports/officer', {
      params: {
        companyGuid: queryParams.companyGuid, // GUID perusahaan
        type: queryParams.type, 
        startDate: queryParams.startDate, // Optional start date filter
        endDate: queryParams.endDate, // Optional end date filter
        limit: queryParams.limit || 5, // Optional limit, default to 10
        page: queryParams.page || 1 // Optional page number, default to 1
      },
    });
    return response.data; // Assuming the response contains the data for the reports
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch officer reports');
  }
};
