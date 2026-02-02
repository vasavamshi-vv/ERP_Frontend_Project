import ApiClient from "./api-client";
import { toast } from "react-toastify";

class UserApiProvider {
  // =====================================================
  // FETCH LISTS (Branches, Departments, Roles, Users)
  // =====================================================

  async fetchBranches() {
    try {
      const res = await ApiClient.get("/masters/branches/");
      if (res.status === 200) return res.data;

      toast.error("Failed to load branches");
      return [];
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error loading branches");
      return [];
    }
  }

  async fetchDepartments(branchId = null) {
    try {
       const url = branchId
        ? `/masters/departments/?branch=${branchId}`
        : `/masters/departments/`;
      // const res = await ApiClient.get("/masters/departments/?branch=${branchId}");
      const res = await ApiClient.get(url);
      if (res.status === 200) return res.data.departments ?? [];

      toast.error("Failed to load departments");
      return [];
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error loading departments");
      return [];
    }
  }

  async fetchRoles(departmentId = null) {
    try {
      const url = departmentId
        ? `/masters/roles/?department=${departmentId}`
        : `/masters/roles/`;

      const res = await ApiClient.get(url);

      if (res.status === 200) return res.data.roles ?? res.data;

      toast.error("Failed to load roles");
      return [];
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error loading roles");
      return [];
    }
  }

 async fetchUsers(page = 1, search = "") {
  try {
    console.log("Fetching users with page:", page, "search:", search);

    const res = await ApiClient.get("/masters/users/", {
      params: { page, search }
    });

    if (res.status === 200) return res.data;

    toast.error("Failed to load users");
    return { users: [], total_pages: 1, current_page: 1 };
  } catch (error) {
    toast.error(error?.response?.data?.message || "Error loading users");
    return { users: [], total_pages: 1, current_page: 1 };
  }
}



  // =====================================================
  // CREATE USER
  // =====================================================

  async createUser(data) {
    try {
      const res = await ApiClient.post("/masters/users/", data);

      if (res.status === 200 || res.status === 201) {
        return res.data;
      }

      toast.error("Failed to create user");
      return null;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error creating user");
      return null;
    }
  }

  // =====================================================
  // UPDATE USER
  // =====================================================

  async updateUser(userId, data) {
    try {
      const res = await ApiClient.put(`/masters/users/${userId}/`, data);

      if (res.status === 200) {
        return res.data;
      }

      toast.error("Failed to update user");
      return null;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error updating user");
      return null;
    }
  }
  // =====================================================
// DELETE USER
// =====================================================
async deleteUser(userId) {
  try {
    const res = await ApiClient.delete(
      `/masters/users/${userId}/` // ✅ trailing slash
    );

    if (res.status === 200 || res.status === 204) {
      toast.success("User deleted successfully");
      return true;
    }

    toast.error("Failed to delete user");
    return false;
  } catch (error) {
    console.error("Delete user error:", error?.response?.data || error);
    toast.error(error?.response?.data?.message || "Error deleting user");
    return false;
  }
  }
}

const userApiProvider = new UserApiProvider();
export default userApiProvider;
