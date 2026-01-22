// import React, { useState, useEffect } from "react";
// import "./createNewRole.css";
// import { toast } from "react-toastify";
// import departmentRoleApiProvider from "../../../network/departmentRole-api-provider";
// import ApiClient from "../../../network/api-client"; // for fetching branches

// export default function CreateNewRole({
//   setShowNewRole,
//   editRole,
//   editRoleOnly,
//   setEditRole,
//   setEditRoleOnly,
// }) {
//   // State for branches and departments
//   const [branches, setBranches] = useState([]);
//   const [departments, setDepartments] = useState([]);

//   // State for the role form and permissions
//   const [inputRoleAccess, setInputRoleAccess] = useState({
//     role: "",
//     description: "",
//     department: "",
//     branch: "",
//     access: {
//       dashboard: { fullAccess: false, view: false, create: false, edit: false, delete: false },
//       task: { fullAccess: false, view: false, create: false, edit: false, delete: false },
//       projectTracker: { fullAccess: false, view: false, create: false, edit: false, delete: false },
//       onboarding: { fullAccess: false, view: false, create: false, edit: false, delete: false },
//       attendance: { fullAccess: false, view: false, create: false, edit: false, delete: false },
//     },
//   });

//   // Fetch branches from API
//   const fetchBranches = async () => {
//     try {
//       const res = await ApiClient.get("/masters/branches/");
//       if (res.status === 200) setBranches(res.data.branches || []);
//     } catch (err) {
//       toast.error("Failed to load branches");
//     }
//   };

//   // Fetch departments from API
//   const fetchDepartments = async () => {
//     const data = await departmentRoleApiProvider.fetchDepartments();
//     setDepartments(data.departments || []);
//   };

//   useEffect(() => {
//     fetchBranches();
//     fetchDepartments();
//   }, []);

//   // Populate form if editing a role
//   useEffect(() => {
//     if (editRoleOnly && editRole) {
//       const defaultAccess = {
//         dashboard: { fullAccess: false, view: false, create: false, edit: false, delete: false },
//         task: { fullAccess: false, view: false, create: false, edit: false, delete: false },
//         projectTracker: { fullAccess: false, view: false, create: false, edit: false, delete: false },
//         onboarding: { fullAccess: false, view: false, create: false, edit: false, delete: false },
//         attendance: { fullAccess: false, view: false, create: false, edit: false, delete: false },
//       };
//       setInputRoleAccess({
//         role: editRole.role || "",
//         description: editRole.description || "",
//         department: editRole.department || "",
//         branch: editRole.branch || "",
//         access: { ...defaultAccess, ...(editRole.permissions || {}) },
//       });
//     }
//   }, [editRoleOnly, editRole]);

//   // Handle checkbox changes in permission table
//   const handleInputRoleChange = (e, pageName) => {
//     const { id, checked } = e.target;
//     setInputRoleAccess((prev) => {
//       const newAccess = { ...prev.access[pageName], [id]: checked };

//       // If Full Access is toggled, update all permissions for that page
//       if (id === "fullAccess") {
//         Object.keys(newAccess).forEach((perm) => {
//           newAccess[perm] = checked;
//         });
//       }

//       return { ...prev, access: { ...prev.access, [pageName]: newAccess } };
//     });
//   };

//   // Reset all checkboxes to false
//   const handleResetInputBox = () => {
//     setInputRoleAccess((prev) => ({
//       ...prev,
//       access: Object.fromEntries(
//         Object.keys(prev.access).map((key) => [
//           key,
//           { fullAccess: false, view: false, create: false, edit: false, delete: false },
//         ])
//       ),
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { department, branch, role, description, access } = inputRoleAccess;

//     // Basic validation
//     if (!department || !branch || !role?.trim() || !description?.trim()) {
//       toast.error("Please fill in all required fields.");
//       return;
//     }

//     const hasPermission = Object.values(access).some((perm) => Object.values(perm).some(Boolean));
//     if (!hasPermission) {
//       toast.error("Please assign at least one permission.");
//       return;
//     }

//     try {
//       if (editRoleOnly && editRole?.id) {
//         await departmentRoleApiProvider.updateDepartment(editRole.id, {
//           department,
//           branch,
//           role,
//           description,
//           permissions: access,
//         });
//         toast.success("Role updated successfully!");
//       } else {
//         await departmentRoleApiProvider.createDepartment({
//           department,
//           branch,
//           role,
//           description,
//           permissions: access,
//         });
//         toast.success("Role created successfully!");
//       }
//       setShowNewRole(false);
//       setEditRoleOnly(false);
//       setEditRole({});
//     } catch (err) {
//       toast.error(err?.message || "Failed to save role.");
//     }
//   };

//   return (
//     <div className="create-newrole-cointainer">
//       {/* Header */}
//       <div className="create-role-head">
//         <p>{editRoleOnly ? "Edit" : "Create"} Role</p>
//         <svg
//           className="x-logo-create-role"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 384 512"
//           onClick={() => setShowNewRole(false)}
//         >
//           <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
//         </svg>
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit}>
//         {/* Department & Branch Selection */}
//         <div className="create-role-content">
//           <div className="create-role-grid grid grid-cols-2 gap-6 w-full">
//             <div className="create-role-box">
//               <label htmlFor="department">Select Department<sup>*</sup></label>
//               <select
//                 id="department"
//                 value={inputRoleAccess.department || ""}
//                 onChange={(e) =>
//                   setInputRoleAccess({ ...inputRoleAccess, department: parseInt(e.target.value) })
//                 }
//               >
//                 <option value="">Select a department</option>
//                 {departments.map((d) => (
//                   <option key={d.id} value={d.id}>
//                     {d.department_name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="create-role-box">
//               <label htmlFor="branch">Select Branch<sup>*</sup></label>
//               <select
//                   id="branch"
//                   value={createDepartmentForm.branch}
//                   onChange={handleCreateDepartmentChange}
//                   required
//                 >
//                   <option value="">Select a branch</option>
//                   {branchList.map((branch) => (
//                     <option key={branch.id} value={branch.id}>
//                       {branch.name}
//                     </option>
//                   ))}
//                 </select>
//             </div>

//             {/* Role Name */}
//             <div className="create-role-box">
//               <label htmlFor="role_name">Role Name<sup>*</sup></label>
//               <input
//                 id="role_name"
//                 type="text"
//                 placeholder="Enter Role Name"
//                 value={inputRoleAccess.role}
//                 onChange={(e) =>
//                   setInputRoleAccess({ ...inputRoleAccess, role: e.target.value })
//                 }
//               />
//             </div>

//             {/* Description */}
//             <div className="create-role-box">
//               <label htmlFor="description">Description<sup>*</sup></label>
//               <input
//                 id="description"
//                 type="text"
//                 placeholder="Enter Description"
//                 value={inputRoleAccess.description}
//                 onChange={(e) =>
//                   setInputRoleAccess({ ...inputRoleAccess, description: e.target.value })
//                 }
//               />
//             </div>
//           </div>
//         </div>

//         {/* Permission Table Header */}
//         <div className="create-role-content">
//           <div className="role-permission-title">
//             <p>Permission</p>
//             <button type="reset" onClick={handleResetInputBox}>
//               Reset
//             </button>
//           </div>
//         </div>

//         {/* Permission Table */}
//         <div className="create-role-table">
//           <table>
//             <thead className="ceate-role-head">
//               <tr>
//                 <th>Menus</th>
//                 <th>Full Access</th>
//                 <th>View</th>
//                 <th>Create</th>
//                 <th>Edit</th>
//                 <th>Delete</th>
//               </tr>
//             </thead>
//             <tbody className="ceate-role-body">
//               {Object.keys(inputRoleAccess.access).map((page) => (
//                 <tr key={page}>
//                   <td>
//                     {page
//                       .split(/(?=[A-Z])/)
//                       .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//                       .join(" ")}
//                   </td>
//                   {["fullAccess", "view", "create", "edit", "delete"].map((perm) => (
//                     <td key={perm}>
//                       <input
//                         type="checkbox"
//                         id={perm}
//                         checked={inputRoleAccess.access[page][perm]}
//                         onChange={(e) => handleInputRoleChange(e, page)}
//                       />
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Form Buttons */}
//         <div className="create-role-submit-container">
//           <nav>
//             <button
//               className="create-role-cancel"
//               onClick={(e) => {
//                 e.preventDefault();
//                 setShowNewRole(false);
//                 setEditRoleOnly(false);
//                 setEditRole({});
//               }}
//             >
//               Cancel
//             </button>
//             <button type="submit" className="create-role-save">
//               Save
//             </button>
//           </nav>
//         </div>
//       </form>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import "./createNewRole.css";
import { toast } from "react-toastify";
import departmentRoleApiProvider from "../../../network/departmentRole-api-provider";
import ApiClient from "../../../network/api-client";

const DEFAULT_ACCESS = {
  dashboard: { fullAccess: false, view: false, create: false, edit: false, delete: false },
  task: { fullAccess: false, view: false, create: false, edit: false, delete: false },
  projectTracker: { fullAccess: false, view: false, create: false, edit: false, delete: false },
  onboarding: { fullAccess: false, view: false, create: false, edit: false, delete: false },
  attendance: { fullAccess: false, view: false, create: false, edit: false, delete: false },
};

export default function CreateNewRole({
  setShowNewRole,
  editRole,
  editRoleOnly,
  setEditRole,
  setEditRoleOnly,
}) {
  /* =======================
     STATE
  ======================= */
  const [branches, setBranches] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [inputRoleAccess, setInputRoleAccess] = useState({
    role: "",
    description: "",
    department: "",
    branch: "",
    access: DEFAULT_ACCESS,
  });

  /* =======================
     FETCH DATA
  ======================= */
  useEffect(() => {
    fetchBranches();
    fetchDepartments();
  }, []);

  const fetchBranches = async () => {
    try {
      const res = await ApiClient.get("/masters/branches/");
      if (res.status === 200) setBranches(res.data.branches || []);
    } catch {
      toast.error("Failed to load branches");
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await departmentRoleApiProvider.fetchDepartments();
      setDepartments(res.departments || []);
    } catch {
      toast.error("Failed to load departments");
    }
  };

  /* =======================
     EDIT MODE PREFILL
  ======================= */
  useEffect(() => {
    if (editRoleOnly && editRole?.id) {
      setInputRoleAccess({
        role: editRole.role || "",
        description: editRole.description || "",
        department: editRole.department || "",
        branch: editRole.branch || "",
        access: { ...DEFAULT_ACCESS, ...(editRole.permissions || {}) },
      });
    } else {
      // CREATE MODE RESET
      setInputRoleAccess({
        role: "",
        description: "",
        department: "",
        branch: "",
        access: DEFAULT_ACCESS,
      });
    }
  }, [editRoleOnly, editRole]);

  /* =======================
     PERMISSION HANDLER
  ======================= */
  const handlePermissionChange = (e, page) => {
    const { id, checked } = e.target;

    setInputRoleAccess((prev) => {
      const updated = { ...prev.access[page], [id]: checked };

      if (id === "fullAccess") {
        Object.keys(updated).forEach((k) => {
          updated[k] = checked;
        });
      }

      return {
        ...prev,
        access: { ...prev.access, [page]: updated },
      };
    });
  };

  const resetPermissions = () => {
    setInputRoleAccess((prev) => ({
      ...prev,
      access: DEFAULT_ACCESS,
    }));
  };

  /* =======================
     SUBMIT
  ======================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { role, description, department, branch, access } = inputRoleAccess;

    if (!role || !description || !department || !branch) {
      toast.error("Please fill all required fields");
      return;
    }

    const hasPermission = Object.values(access).some((p) =>
      Object.values(p).some(Boolean)
    );

    if (!hasPermission) {
      toast.error("Assign at least one permission");
      return;
    }

    try {
      if (editRoleOnly && editRole?.id) {
        await departmentRoleApiProvider.updateRole(editRole.id, {
          role,
          description,
          department,
          branch,
          permissions: access,
        });
        toast.success("Role updated successfully");
      } else {
        await departmentRoleApiProvider.createRole({
          role,
          description,
          department,
          branch,
          permissions: access,
        });
        toast.success("Role created successfully");
      }

      closeModal();
    } catch {
      toast.error("Failed to save role");
    }
  };

  /* =======================
     CLOSE
  ======================= */
  const closeModal = () => {
    setShowNewRole(false);
    setEditRoleOnly(false);
    setEditRole({});
  };

  /* =======================
     UI
  ======================= */
  return (
    <div className="create-newrole-cointainer">
      {/* HEADER */}
      <div className="create-role-head">
        <p>{editRoleOnly ? "Edit" : "Create"} Role</p>
        <svg
          className="x-logo-create-role"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          onClick={closeModal}
        >
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
        </svg>
      </div>

      <form onSubmit={handleSubmit}>
        {/* FORM */}
        <div className="create-role-content">
          <div className="create-role-grid grid grid-cols-2 gap-6">
            {/* DEPARTMENT */}
            <div className="create-role-box">
              <label>Select Department<sup>*</sup></label>
              <select
                value={inputRoleAccess.department}
                onChange={(e) =>
                  setInputRoleAccess({ ...inputRoleAccess, department: Number(e.target.value) })
                }
              >
                <option value="">Select department</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.department_name}
                  </option>
                ))}
              </select>
            </div>

            {/* BRANCH */}
            <div className="create-role-box">
              <label>Select Branch<sup>*</sup></label>
              <select
                value={inputRoleAccess.branch}
                onChange={(e) =>
                  setInputRoleAccess({ ...inputRoleAccess, branch: Number(e.target.value) })
                }
              >
                <option value="">Select branch</option>
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            {/* ROLE */}
            <div className="create-role-box">
              <label>Role Name<sup>*</sup></label>
              <input
                value={inputRoleAccess.role}
                onChange={(e) =>
                  setInputRoleAccess({ ...inputRoleAccess, role: e.target.value })
                }
              />
            </div>

            {/* DESCRIPTION */}
            <div className="create-role-box">
              <label>Description<sup>*</sup></label>
              <input
                value={inputRoleAccess.description}
                onChange={(e) =>
                  setInputRoleAccess({ ...inputRoleAccess, description: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* PERMISSIONS */}
        <div className="create-role-content">
          <div className="role-permission-title">
            <p>Permission</p>
            <button type="button" onClick={resetPermissions}>
              Reset
            </button>
          </div>
        </div>

        <div className="create-role-table">
          <table>
            <thead>
              <tr>
                <th>Menus</th>
                <th>Full</th>
                <th>View</th>
                <th>Create</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(inputRoleAccess.access).map((page) => (
                <tr key={page}>
                  <td>{page.replace(/([A-Z])/g, " $1")}</td>
                  {["fullAccess", "view", "create", "edit", "delete"].map((perm) => (
                    <td key={perm}>
                      <input
                        type="checkbox"
                        id={perm}
                        checked={inputRoleAccess.access[page][perm]}
                        onChange={(e) => handlePermissionChange(e, page)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ACTIONS */}
        <div className="create-role-submit-container">
          <button className="create-role-cancel" onClick={closeModal}>
            Cancel
          </button>
          <button type="submit" className="create-role-save">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
