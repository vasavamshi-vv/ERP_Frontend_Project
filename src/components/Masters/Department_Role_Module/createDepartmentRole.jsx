import React, { useEffect, useState } from "react";
import "./createDepartmentrole.css";
import { toast } from "react-toastify";
import departmentRoleApiProvider from "../../../network/departmentRole-api-provider";

export default function CreateDepartmentRole({
  showDepartmentRole,
  editDept,
  onClose,
  setShowNewRole,
  setEditRoleOnly,
  setEditRole,
}) {
  const initialForm = {
    department_name: "",
    code: "",
    branch: "",
    description: "",
  };

  const [form, setForm] = useState(initialForm);
  const [roles, setRoles] = useState([]);
  const [branchList, setBranchList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rolesLoading, setRolesLoading] = useState(false);

  /* LOAD BRANCHES */
  useEffect(() => {
    departmentRoleApiProvider
      .fetchBranches()
      .then((res) => setBranchList(res || []))
      .catch(() => toast.error("Failed to load branches"));
  }, []);

  /* PREFILL EDIT MODE */
  useEffect(() => {
    if (!editDept?.id) {
      setForm(initialForm);
      setRoles([]);
      return;
    }

    setForm({
      department_name: editDept.department_name || "",
      code: editDept.code || "",
      branch:
        typeof editDept.branch === "object"
          ? editDept.branch.id
          : editDept.branch || "",
      description: editDept.description || "",
    });

    fetchRoles(editDept.id);
  }, [editDept]);

  /* FETCH ROLES (EDIT ONLY) */
  const fetchRoles = async (id) => {
    setRolesLoading(true);
    try {
      const res = await departmentRoleApiProvider.fetchRoles(id);
      setRoles(res || []);
    } catch {
      toast.error("Failed to load roles");
    } finally {
      setRolesLoading(false);
    }
  };

  /* INPUT CHANGE */
  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "department_name" && !/^[a-zA-Z\s]*$/.test(value)) return;
    if (id === "code" && !/^[a-zA-Z0-9]*$/.test(value)) return;
    if (id === "description" && value.length > 500) return;

    setForm((prev) => ({
      ...prev,
      [id]: id === "branch" ? Number(value) : value,
    }));
  };

  /* SAVE DEPARTMENT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (editDept?.id) {
        await departmentRoleApiProvider.updateDepartment(editDept.id, form);
      } else {
        await departmentRoleApiProvider.createDepartment(form);
      }
      onClose();
    } catch {
      toast.error("Save failed");
    } finally {
      setIsLoading(false);
    }
  };

  /* ROLE TABLE */
  const renderRolesUI = () => (
    <table className="role-table">
      <thead>
        <tr>
          <th>Role Name</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {rolesLoading ? (
          <tr>
            <td colSpan="3" className="table-empty">
              Loading roles...
            </td>
          </tr>
        ) : roles.length === 0 ? (
          <tr>
            <td colSpan="3" className="table-empty">
              No roles added
            </td>
          </tr>
        ) : (
          roles.map((role) => (
            <tr key={role.id}>
              <td>{role.role}</td>
              <td>{role.description || "—"}</td>
              <td>
                <span
                  className="role-edit"
                  onClick={() => {
                    setEditRole(role);
                    setEditRoleOnly(true);
                    setShowNewRole(true);
                  }}
                >
                  Edit Role
                </span>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  return (
    <div
      className={`create-department-role-container ${
        showDepartmentRole ? "block" : ""
      }`}
    >
      <div className="create-department-head">
        <p>{editDept?.id ? "Edit" : "Create New"} Department</p>
      </div>

      <form onSubmit={handleSubmit} className="create-department-body">
        <div className="create-department-content">
          <Input
            id="department_name"
            label="Department Name"
            placeholder="Enter Your Department Name"
            required
            value={form.department_name}
            onChange={handleChange}
          />
          <Input
            id="code"
            label="Code"
            placeholder="Enter Your Department Code"
            required
            value={form.code}
            onChange={handleChange}
          />
        </div>

        <Select
          id="branch"
          label="Branch"
          placeholder="Select Branch"
          required
          value={form.branch}
          onChange={handleChange}
          options={branchList}
        />

        <Input
          id="description"
          label="Description"
          placeholder="Enter Your Description"
          value={form.description}
          onChange={handleChange}
        />

        {/* ROLES */}
        <div className="display-role-cointainer-title">
          <nav>
            <p>Roles</p>
            <button
              type="button"
              onClick={() => {
                setEditRole({});
                setEditRoleOnly(false);
                setShowNewRole(true);
              }}
            >
              + Add Role
            </button>
          </nav>
        </div>

        <div className="display-role-cointainer">{renderRolesUI()}</div>

        <div className="create-department-submit-container">
          <button
            type="button"
            className="create-department-cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="create-department-save"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* INPUT */
const Input = ({ label, id, ...props }) => (
  <div className="create-department-box">
    <label htmlFor={id}>
      {label} {props.required && <sup>*</sup>}
    </label>
    <input id={id} {...props} />
  </div>
);

/* SELECT */
const Select = ({ label, id, options, ...props }) => (
  <div className="create-department-box" id="create-department-box-fullwidth">
    <label htmlFor={id}>
      {label} {props.required && <sup>*</sup>}
    </label>
    <select id={id} {...props}>
      <option value="">Select {label}</option>
      {options.map((o) => (
        <option key={o.id} value={o.id}>
          {o.name}
        </option>
      ))}
    </select>
  </div>
);
