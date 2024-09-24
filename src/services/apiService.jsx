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
    const token = localStorage.getItem('userToken'); // Pastikan kunci token konsisten
    if (token) {
      console.log('Token found in local storage:', token); // Log token
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn('No token found in local storage');
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
        console.error('Unauthorized. Please check your authentication token.');
        // Opsional: tangani penyegaran token atau alihkan ke login
      } else {
        console.error(`Error ${error.response.status}: ${error.response.statusText}`);
      }
    } else {
      console.error('Error fetching data:', error);
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
    console.log('Login response:', response.data); // Tambahkan log
    const { token } = response.data;
    if (token) {
      localStorage.setItem('userToken', token); // Simpan token di localStorage
      console.log('Token stored in local storage:', token); // Log token
    } 
    return response;
  } catch (error) {
    console.error('Error logging in:', error);
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
  data.guidAplication = guidAplication;
  return apiClient.post('/users/register', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getAllCompanies= async () => {
  try {
    const response = await apiClient.get('/companies');
    // console.log('Get All Companies Response:', response.data); // Log the response data
    return response.data?.data || []; // Access and return the companies array, default to empty array
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch companies');
  }
};

// Fungsi logout
export const logout = () => {
  localStorage.removeItem('userToken');
  console.log('User logged out successfully. Token removed.');
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
      console.error(`Error ${error.response.status}: ${error.response.statusText}`);
      if (error.response.status === 401) {
        console.error('Unauthorized access. Redirecting to login.');
        throw new Error('Unauthorized access. Please log in again.');
      }
      throw new Error(`Error ${error.response.status}: ${error.response.statusText}`);
    } else {
      console.error('Failed to activate account. Please try again later.', error);
      throw new Error('Failed to activate account. Please try again.');
    }
  }
};

export const getUserProfile = async () => {
    try {
      const response = await apiClient.get('/users/profile');
      console.log('Response dari API Profile:', response.data); // Log data respons
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error(`Error ${error.response.status}: ${error.response.statusText}`);
        if (error.response.status === 401) {
          console.error('Unauthorized access. Redirecting to login.');
          throw new Error('Unauthorized access. Please log in again.');
        }
        throw new Error(`Error ${error.response.status}: ${error.response.statusText}`);
      } else {
        console.error('Failed to fetch profile. Please try again later.', error);
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
      console.error('Error updating user profile:', error);
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
      handleErrorResponse(error);
      throw error;
    }
  };

  export const addReport = async (formData) => {
    try {
        const appToken = localStorage.getItem('appToken'); // Get the appToken from localStorage
        const response = await apiAdminFile.post('/reports/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${appToken}` // Use appToken here
            }
        });
        return response.data; // Ensure you return the response data directly
    } catch (error) {
        console.error('Error adding report:', error); // Log the error
        throw new Error(error.response?.data?.message || "Failed to add report");
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
    console.log('Get All Reports by Company Response:', response.data);
    return response.data; // Assuming the response contains the data for the reports
  } catch (error) {
    console.error('Error fetching officer reports:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch officer reports');
  }
};

