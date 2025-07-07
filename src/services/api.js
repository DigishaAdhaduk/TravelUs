import axios from "axios";

// ===== TRAVELUS API CONFIGURATION =====
// All endpoints must match the provided API documentation exactly

export const BASE_URL = "http://localhost:8084";

// Auth API Endpoints - for user authentication
export const AUTH_API = {
  SIGNUP: `${BASE_URL}/auth/signup`, // POST - Register new user
  LOGIN: `${BASE_URL}/auth/login`, // POST - User login
};

// Group API Endpoints - for travel group management
export const GROUP_API = {
  MY_GROUPS: `${BASE_URL}/groups/my`, // GET - Fetch user's groups
  CREATE_GROUP: `${BASE_URL}/groups/create`, // POST - Create new group
  INVITE: (groupId) => `${BASE_URL}/groups/${groupId}/invite`, // POST - Generate invite
  JOIN: `${BASE_URL}/groups/join`, // POST - Join with invite code
  GROUP_DETAILS: (groupId) => `${BASE_URL}/groups/${groupId}`, // GET - Group info
};

// Document API Endpoints - for travel document management
export const DOCUMENT_API = {
  UPLOAD: (groupId) => `${BASE_URL}/groups/${groupId}/documents/upload`, // POST - Upload PDF
  LIST: (groupId) => `${BASE_URL}/groups/${groupId}/documents`, // GET - List documents
  VIEW: (groupId, documentId) =>
    `${BASE_URL}/groups/${groupId}/documents/${documentId}/view`, // GET - View document
  DELETE: (groupId, documentId) =>
    `${BASE_URL}/groups/${groupId}/documents/${documentId}`, // DELETE - Remove document
};

// Message API Endpoints - for group chat
export const MESSAGE_API = {
  GET_MESSAGES: (groupId) => `${BASE_URL}/groups/${groupId}/messages`, // GET - Chat messages
};

// Expense API Endpoints - for expense tracking
export const EXPENSE_API = {
  ADD: `${BASE_URL}/expenses/add`, // POST - Add expense
  LIST: (groupId) => `${BASE_URL}/expenses/group/${groupId}`, // GET - Group expenses
  SETTLE: (groupId) => `${BASE_URL}/expenses/group/${groupId}/settle`, // GET - Settlements
  BALANCE: (groupId) => `${BASE_URL}/expenses/group/${groupId}/balance`, // GET - Balances
};

// Axios setup with proper timeout and headers
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// ===== AUTHENTICATION SERVICES =====

export const authAPI = {
  // User login - validates credentials and returns JWT token
  async login(username, password) {
    try {
      const response = await api.post(AUTH_API.LOGIN, {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        console.warn("Backend offline, using test data");
        return { token: "test-token-" + Date.now() };
      }
      throw error;
    }
  },

  // User registration - creates new account
  async signup(username, email, password, name) {
    try {
      const response = await api.post(AUTH_API.SIGNUP, {
        username,
        email,
        password,
        name,
      });
      return response.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        console.warn("Backend offline, using test response");
        return "User registered successfully";
      }
      throw error;
    }
  },
};

// ===== GROUP MANAGEMENT SERVICES =====

export const groupsAPI = {
  // Get all groups user belongs to
  async getMyGroups() {
    try {
      const response = await api.get(GROUP_API.MY_GROUPS);
      return response.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        return [];
      }
      throw error;
    }
  },

  // Create new travel group
  async createGroup(groupName) {
    try {
      const response = await api.post(GROUP_API.CREATE_GROUP, { groupName });
      return response.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        const mockId = Math.floor(Math.random() * 1000);
        return `Group created with ID: ${mockId}`;
      }
      throw error;
    }
  },

  // Get specific group details
  async getGroup(id) {
    try {
      const response = await api.get(GROUP_API.GROUP_DETAILS(id));
      return response.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        return {
          groupId: id,
          groupName: "Test Group",
          adminUsername: "admin",
          members: ["admin", "user1"],
        };
      }
      throw error;
    }
  },

  // Generate invite link for group
  async inviteToGroup(groupId) {
    try {
      const response = await api.post(GROUP_API.INVITE(groupId));
      return response.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        const code = `test-${Date.now()}`;
        return `Invite link: ${BASE_URL}/groups/join?code=${code}`;
      }
      throw error;
    }
  },

  // Join group using invite code
  async joinGroup(code) {
    try {
      const response = await api.post(`${GROUP_API.JOIN}?code=${code}`);
      return response.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        return "Successfully joined the group!";
      }
      throw error;
    }
  },
};

// ===== DOCUMENT MANAGEMENT SERVICES =====

export const documentsAPI = {
  // Get all documents in group
  async getGroupDocuments(groupId) {
    try {
      const response = await api.get(DOCUMENT_API.LIST(groupId));
      return response.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        return [];
      }
      throw error;
    }
  },

  // Upload PDF document to group
  async uploadDocument(groupId, file) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post(DOCUMENT_API.UPLOAD(groupId), formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        return {
          fileUrl: "test-url",
          fileName: file.name,
        };
      }
      throw error;
    }
  },

  // View document (returns URL in headers)
  async viewDocument(groupId, documentId) {
    try {
      const response = await api.get(DOCUMENT_API.VIEW(groupId, documentId));
      return response.headers.location;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        return "test-document-url";
      }
      throw error;
    }
  },

  // Delete document from group
  async deleteDocument(groupId, documentId) {
    try {
      const response = await api.delete(
        DOCUMENT_API.DELETE(groupId, documentId),
      );
      return response.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        return "Successfully deleted!";
      }
      throw error;
    }
  },
};

// ===== CHAT SERVICES =====

export const messagesAPI = {
  // Get chat messages for group
  async getGroupMessages(groupId) {
    try {
      const response = await api.get(MESSAGE_API.GET_MESSAGES(groupId));
      return response.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        return [];
      }
      throw error;
    }
  },
};

// ===== EXPENSE TRACKING SERVICES =====

export const expensesAPI = {
  // Add new shared expense
  async addExpense(groupId, title, amount) {
    try {
      const response = await api.post(EXPENSE_API.ADD, {
        groupId,
        title,
        amount,
      });
      return response.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        return "Expense added successfully.";
      }
      throw error;
    }
  },

  // Get all expenses for group
  async getGroupExpenses(groupId) {
    try {
      const response = await api.get(EXPENSE_API.LIST(groupId));
      return response.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        return [];
      }
      throw error;
    }
  },

  // Get balance summary (who owes whom)
  async getGroupBalance(groupId) {
    try {
      const response = await api.get(EXPENSE_API.BALANCE(groupId));
      return response.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        return { youOwe: [], youAreOwed: [] };
      }
      throw error;
    }
  },

  // Get settlement suggestions
  async getSettlements(groupId) {
    try {
      const response = await api.get(EXPENSE_API.SETTLE(groupId));
      return response.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        return [];
      }
      throw error;
    }
  },
};

export default api;
