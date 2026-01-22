// src/network/department-api-provider.js
import ApiClient from "./api-client";
import { toast } from "react-toastify";

class DepartmentRoleApiProvider {
  // =====================================================
  // FETCH DEPARTMENTS
  // =====================================================
  async fetchDepartments(page = 1, search = "") {
    try {
      console.log("Fetching departments with page:", page, "search:", search);

      const res = await ApiClient.get("/masters/departments/", {
        params: { page, search },
      });

      if (res.status === 200) return res.data;

      toast.error("Failed to load departments");
      return { departments: [], total_pages: 1, current_page: 1 };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error loading departments");
      return { departments: [], total_pages: 1, current_page: 1 };
    }
  }

  // =====================================================
  // CREATE DEPARTMENT
  // =====================================================
  async createDepartment(data) {
    try {
      const res = await ApiClient.post("/masters/departments/", data);
      if (res.status === 200 || res.status === 201) {
        toast.success("Department created successfully");
        return res.data;
      }

      toast.error("Failed to create department");
      return null;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error creating department");
      return null;
    }
  }

  // =====================================================
  // UPDATE DEPARTMENT
  // =====================================================
  async updateDepartment(departmentId, data) {
    try {
      const res = await ApiClient.put(`/masters/departments/${departmentId}/`, data);
      if (res.status === 200) {
        toast.success("Department updated successfully");
        return res.data;
      }

      toast.error("Failed to update department");
      return null;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error updating department");
      return null;
    }
  }

  // =====================================================
  // DELETE DEPARTMENT
  // =====================================================
  async deleteDepartment(departmentId) {
    try {
      const res = await ApiClient.delete(`/masters/departments/${departmentId}/`);
      if (res.status === 200 || res.status === 204) {
        toast.success("Department deleted successfully");
        return true;
      }

      toast.error("Failed to delete department");
      return false;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error deleting department");
      return false;
    }
  }

   async fetchBranches() {
    try {
      console.log("Fetching branches with page:");

      const res = await ApiClient.get("/masters/branches/");

      if (res.status === 200) return res.data;

      toast.error("Failed to load branches");
      return { branches: [] };
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error loading branches");
      return { branches: [] };
    }
  }
}

const departmentRoleApiProvider = new DepartmentRoleApiProvider();
export default departmentRoleApiProvider;
