// // // import React, { useEffect, useState } from "react";
// // // import "./createDepartmentrole.css";
// // // import { toast } from "react-toastify";
// // // import departmentRoleApiProvider from "../../../network/departmentRole-api-provider";

// // // export default function CreateDepartmentRole({
// // //   showDepartmentRole,
// // //   editDepartmentRole,
// // //   editDept,
// // //   onClose,
// // //   setShowNewRole,
// // //   setEditRoleOnly,
// // //   setEditRole,
// // // }) {
// // //   /* ===========================
// // //      STATE
// // //   ============================ */
// // //   const initialForm = {
// // //     department_name: "",
// // //     code: "",
// // //     branch: "",
// // //     description: "",
// // //   };

// // //   const [form, setForm] = useState(initialForm);
// // //   const [roles, setRoles] = useState([]);
// // //   const [branchList, setBranchList] = useState([]);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [rolesLoading, setRolesLoading] = useState(false);

// // //   /* ===========================
// // //      LOAD BRANCHES (ONCE)
// // //   ============================ */
// // //   useEffect(() => {
// // //     const fetchBranches = async () => {
// // //       try {
// // //         const res = await departmentRoleApiProvider.fetchBranches();
// // //         setBranchList(res || []);
// // //       } catch {
// // //         toast.error("Failed to load branches");
// // //       }
// // //     };
// // //     fetchBranches();
// // //   }, []);

// // //   /* ===========================
// // //      PREFILL EDIT MODE
// // //   ============================ */
// // //   useEffect(() => {
// // //     if (!editDepartmentRole || !editDept?.id) {
// // //       setForm(initialForm);
// // //       setRoles([]);
// // //       return;
// // //     }

// // //     setForm({
// // //       department_name: editDept.department_name || "",
// // //       code: editDept.code || "",
// // //       branch:
// // //         typeof editDept.branch === "object"
// // //           ? editDept.branch.id
// // //           : editDept.branch || "",
// // //       description: editDept.description || "",
// // //     });

// // //     fetchRoles(editDept.id);
// // //   }, [editDepartmentRole, editDept]);

// // //   /* ===========================
// // //      FETCH ROLES
// // //   ============================ */
// // //   const fetchRoles = async (departmentId) => {
// // //     setRolesLoading(true);
// // //     try {
// // //       const res = await departmentRoleApiProvider.fetchRoles(departmentId);
// // //       setRoles(res || []);
// // //     } catch {
// // //       toast.error("Failed to load roles");
// // //     } finally {
// // //       setRolesLoading(false);
// // //     }
// // //   };

// // //   /* ===========================
// // //      FORM HANDLERS
// // //   ============================ */
// // //   const handleChange = (e) => {
// // //     const { id, value } = e.target;
// // //     setForm((prev) => ({
// // //       ...prev,
// // //       [id]: id === "branch" ? Number(value) : value,
// // //     }));
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     setIsLoading(true);

// // //     try {
// // //       if (editDepartmentRole) {
// // //         await departmentRoleApiProvider.updateDepartment(editDept.id, form);
// // //         toast.success("Department updated successfully");
// // //       } else {
// // //         await departmentRoleApiProvider.createDepartment(form);
// // //         toast.success("Department created successfully");
// // //       }
// // //       onClose();
// // //     } catch {
// // //       toast.error("Failed to save department");
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   /* ===========================
// // //      ROLE UI (CSS SAFE)
// // //   ============================ */
// // //   const renderRolesUI = () => {
// // //   return (
// // //     <table>
// // //       <thead className="display-role-tablehead">
// // //         <tr>
// // //           <th id="display-rolename-width">Role Name</th>
// // //           <th id="display-description-width">Description</th>
// // //           <th id="display-action-width">Action</th>
// // //         </tr>
// // //       </thead>

// // //       <tbody className="display-role-tablebody">
// // //         {!editDepartmentRole ? (
// // //           <tr>
// // //             <td colSpan="3" style={{ textAlign: "center" }}>
// // //               Save department to add roles
// // //             </td>
// // //           </tr>
// // //         ) : rolesLoading ? (
// // //           <tr>
// // //             <td colSpan="3" style={{ textAlign: "center" }}>
// // //               Loading roles...
// // //             </td>
// // //           </tr>
// // //         ) : roles.length === 0 ? (
// // //           <tr>
// // //             <td colSpan="3" style={{ textAlign: "center" }}>
// // //               No roles found
// // //             </td>
// // //           </tr>
// // //         ) : (
// // //           roles.map((role) => (
// // //             <tr key={role.id}>
// // //               <td id="display-rolename-width">{role.role}</td>
// // //               <td id="display-description-width">
// // //                 {role.description || "—"}
// // //               </td>
// // //               <td id="display-action-width">
// // //                 <span
// // //                   className="role-edit"
// // //                   onClick={() => {
// // //                     setEditRole(role);
// // //                     setEditRoleOnly(true);
// // //                     setShowNewRole(true);
// // //                     onClose();
// // //                   }}
// // //                 >
// // //                   Edit
// // //                 </span>
// // //               </td>
// // //             </tr>
// // //           ))
// // //         )}
// // //       </tbody>
// // //     </table>
// // //   );
// // // };


// // //   /* ===========================
// // //      UI
// // //   ============================ */
// // //   return (
// // //     <div
// // //       className={`create-department-role-container ${
// // //         showDepartmentRole ? "block" : ""
// // //       }`}
// // //     >
// // //       {/* CLOSE */}
// // //       <svg
// // //         className="x-logo-create-department"
// // //         xmlns="http://www.w3.org/2000/svg"
// // //         viewBox="0 0 384 512"
// // //         onClick={onClose}
// // //       >
// // //         <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 
// // //         0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 
// // //         0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 
// // //         12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 
// // //         0L192 301.3 297.4 406.6c12.5 12.5 
// // //         32.8 12.5 45.3 0s12.5-32.8 
// // //         0-45.3L237.3 256 342.6 150.6z" />
// // //       </svg>

// // //       <div className="create-department-head">
// // //         <p>{editDepartmentRole ? "Edit" : "Create New"} Department</p>
// // //       </div>

// // //       <div className="create-department-body">
// // //         <form onSubmit={handleSubmit}>
// // //           {/* FORM */}
// // //           <div className="create-department-content">
// // //             <Input
// // //               id="department_name"
// // //               label="Department Name"
// // //               required
// // //               value={form.department_name}
// // //               onChange={handleChange}
// // //             />
// // //             <Input
// // //               id="code"
// // //               label="Code"
// // //               required
// // //               value={form.code}
// // //               onChange={handleChange}
// // //             />
// // //           </div>

// // //           <div className="create-department-content">
// // //             <Select
// // //               id="branch"
// // //               label="Branch"
// // //               required
// // //               value={form.branch}
// // //               onChange={handleChange}
// // //               options={branchList}
// // //             />
// // //           </div>

// // //           <div className="create-department-content">
// // //             <Input
// // //               id="description"
// // //               label="Description"
// // //               value={form.description}
// // //               onChange={handleChange}
// // //             />
// // //           </div>

// // //           {/* ROLES */}
// // //           {/* <div className="create-department-content">
// // //             <div className="display-role-cointainer-title">
// // //               <nav>
// // //                 <p>Roles</p>
// // //                 <button
// // //                   type="button"
// // //                   disabled={!editDepartmentRole}
// // //                   className={!editDepartmentRole ? "btn-disabled" : ""}
// // //                   onClick={() => {
// // //                     setEditRole({});
// // //                     setEditRoleOnly(false);
// // //                     setShowNewRole(true);
// // //                     onClose(); // 🔥 required
// // //                   }}
// // //                 >
// // //                   + Add Role
// // //                 </button>
// // //               </nav>
// // //             </div>

// // //             <div className="display-role-cointainer">
// // //               {renderRolesUI()}
// // //             </div>
// // //           </div> */}
// // //           {/* ROLES SECTION */}
// // // <div className="create-department-role-section">
// // //   <div className="display-role-cointainer-title">
// // //     <nav>
// // //       <p>Roles</p>

// // //       <button
// // //         type="button"
// // //         disabled={!editDepartmentRole}
// // //         className={!editDepartmentRole ? "btn-disabled" : ""}
// // //         onClick={() => {
// // //           setEditRole({});
// // //           setEditRoleOnly(false);
// // //           setShowNewRole(true);
// // //           onClose();
// // //         }}
// // //       >
// // //         + Add Role
// // //       </button>
// // //     </nav>
// // //   </div>

// // //   <div className="display-role-cointainer">
// // //     {renderRolesUI()}
// // //   </div>
// // // </div>


// // //           {/* ACTIONS */}
// // //           <div className="create-department-submit-container">
// // //             <button
// // //               type="button"
// // //               className="create-department-cancel"
// // //               onClick={onClose}
// // //             >
// // //               Cancel
// // //             </button>
// // //             <button
// // //               type="submit"
// // //               className="create-department-save"
// // //               disabled={isLoading}
// // //             >
// // //               {isLoading ? "Saving..." : "Save"}
// // //             </button>
// // //           </div>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // /* ===========================
// // //    HELPERS (CSS FRIENDLY)
// // // =========================== */
// // // const Input = ({ label, id, ...props }) => (
// // //   <div className="create-department-box">
// // //     <label htmlFor={id}>
// // //       {label} {props.required && <sup>*</sup>}
// // //     </label>
// // //     <input id={id} {...props} />
// // //   </div>
// // // );

// // // const Select = ({ label, id, options, ...props }) => (
// // //   <div className="create-department-box" id="create-department-box-fullwidth">
// // //     <label htmlFor={id}>
// // //       {label} {props.required && <sup>*</sup>}
// // //     </label>
// // //     <select id={id} {...props}>
// // //       <option value="">Select {label}</option>
// // //       {options.map((o) => (
// // //         <option key={o.id} value={o.id}>
// // //           {o.name}
// // //         </option>
// // //       ))}
// // //     </select>
// // //   </div>
// // // );

// // import React, { useEffect, useState } from "react";
// // import "./createDepartmentrole.css";
// // import { toast } from "react-toastify";
// // import departmentRoleApiProvider from "../../../network/departmentRole-api-provider";

// // export default function CreateDepartmentRole({
// //   showDepartmentRole,
// //   editDepartmentRole,
// //   editDept,
// //   onClose,
// //   setShowNewRole,
// //   setEditRoleOnly,
// //   setEditRole,
// // }) {
// //   const initialForm = {
// //     department_name: "",
// //     code: "",
// //     branch: "",
// //     description: "",
// //   };

// //   const [form, setForm] = useState(initialForm);
// //   const [roles, setRoles] = useState([]);
// //   const [branchList, setBranchList] = useState([]);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [rolesLoading, setRolesLoading] = useState(false);

// //   /* LOAD BRANCHES */
// //   useEffect(() => {
// //     departmentRoleApiProvider
// //       .fetchBranches()
// //       .then((res) => setBranchList(res || []))
// //       .catch(() => toast.error("Failed to load branches"));
// //   }, []);

// //   /* EDIT MODE PREFILL */
// //   useEffect(() => {
// //     if (!editDept?.id) {
// //       setForm(initialForm);
// //       setRoles([]);
// //       return;
// //     }

// //     setForm({
// //       department_name: editDept.department_name || "",
// //       code: editDept.code || "",
// //       branch:
// //         typeof editDept.branch === "object"
// //           ? editDept.branch.id
// //           : editDept.branch || "",
// //       description: editDept.description || "",
// //     });

// //     fetchRoles(editDept.id);
// //   }, [editDept]);

// //   const fetchRoles = async (id) => {
// //     setRolesLoading(true);
// //     try {
// //       const res = await departmentRoleApiProvider.fetchRoles(id);
// //       setRoles(res || []);
// //     } catch {
// //       toast.error("Failed to load roles");
// //     } finally {
// //       setRolesLoading(false);
// //     }
// //   };

// //   const handleChange = (e) => {
// //     const { id, value } = e.target;
// //     setForm((p) => ({ ...p, [id]: id === "branch" ? Number(value) : value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsLoading(true);
// //     try {
// //       if (editDept?.id) {
// //         await departmentRoleApiProvider.updateDepartment(editDept.id, form);
// //         toast.success("Department updated");
// //       } else {
// //         await departmentRoleApiProvider.createDepartment(form);
// //         toast.success("Department created");
// //       }
// //       onClose();
// //     } catch {
// //       toast.error("Save failed");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const renderRolesUI = () => (
// //     <table>
// //       <thead className="display-role-tablehead">
// //         <tr>
// //           <th className="display-rolename-width">Role Name</th>
// //           <th className="display-description-width">Description</th>
// //           <th className="display-action-width">Action</th>
// //         </tr>
// //       </thead>

// //       <tbody className="display-role-tablebody">
// //         {!editDept?.id ? (
// //           <tr>
// //             <td colSpan="3" align="center">
// //               Save department to add roles
// //             </td>
// //           </tr>
// //         ) : rolesLoading ? (
// //           <tr>
// //             <td colSpan="3" align="center">
// //               Loading roles...
// //             </td>
// //           </tr>
// //         ) : roles.length === 0 ? (
// //           <tr>
// //             <td colSpan="3" align="center">
// //               No roles found
// //             </td>
// //           </tr>
// //         ) : (
// //           roles.map((role) => (
// //             <tr key={role.id}>
// //               <td className="display-rolename-width">{role.role}</td>
// //               <td className="display-description-width">
// //                 {role.description || "—"}
// //               </td>
// //               <td className="display-action-width">
// //                 <span
// //                   className="role-edit"
// //                   onClick={() => {
// //                     setEditRole(role);
// //                     setEditRoleOnly(true);
// //                     setShowNewRole(true);
// //                   }}
// //                 >
// //                   Edit
// //                 </span>
// //               </td>
// //             </tr>
// //           ))
// //         )}
// //       </tbody>
// //     </table>
// //   );

// //   return (
// //     <div className={`create-department-role-container ${showDepartmentRole ? "block" : ""}`}>
// //       <svg className="x-logo-create-department" viewBox="0 0 384 512" onClick={onClose}>
// //         <path d="M342.6 150.6L192 301.3 41.4 150.6" />
// //       </svg>

// //       <div className="create-department-head">
// //         <p>{editDept?.id ? "Edit" : "Create New"} Department</p>
// //       </div>

// //       <form onSubmit={handleSubmit}>
// //         <div className="create-department-content">
// //           <Input id="department_name" label="Department Name" required value={form.department_name} onChange={handleChange} />
// //           <Input id="code" label="Code" required value={form.code} onChange={handleChange} />
// //         </div>

// //         <Select id="branch" label="Branch" required value={form.branch} onChange={handleChange} options={branchList} />

// //         <Input id="description" label="Description" value={form.description} onChange={handleChange} />

// //         <div className="display-role-cointainer-title">
// //           <nav>
// //             <p>Roles</p>
// //             <button
// //               type="button"
// //               disabled={!editDept?.id}
// //               onClick={() => {
// //                 setEditRole({});
// //                 setEditRoleOnly(false);
// //                 setShowNewRole(true);
// //               }}
// //             >
// //               + Add Role
// //             </button>
// //             <button
// //             onClick={() => {
// //               console.log("ADD ROLE CLICKED");
// //               setShowNewRole(true);
// //             }}
// //           >
// //             Add Role
// //           </button>
// //           </nav>
// //         </div>

// //         <div className="display-role-cointainer">{renderRolesUI()}</div>

// //         <div className="create-department-submit-container">
// //           <button type="button" className="create-department-cancel" onClick={onClose}>
// //             Cancel
// //           </button>
// //           <button type="submit" className="create-department-save" disabled={isLoading}>
// //             {isLoading ? "Saving..." : "Save"}
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }

// // /* HELPERS */
// // const Input = ({ label, id, ...props }) => (
// //   <div className="create-department-box">
// //     <label htmlFor={id}>
// //       {label} {props.required && <sup>*</sup>}
// //     </label>
// //     <input id={id} {...props} />
// //   </div>
// // );

// // const Select = ({ label, id, options, ...props }) => (
// //   <div className="create-department-box" id="create-department-box-fullwidth">
// //     <label htmlFor={id}>
// //       {label} {props.required && <sup>*</sup>}
// //     </label>
// //     <select id={id} {...props}>
// //       <option value="">Select {label}</option>
// //       {options.map((o) => (
// //         <option key={o.id} value={o.id}>
// //           {o.name}
// //         </option>
// //       ))}
// //     </select>
// //   </div>
// // );
// // import React, { useEffect, useState } from "react";
// // import "./createDepartmentrole.css";
// // import { toast } from "react-toastify";
// // import departmentRoleApiProvider from "../../../network/departmentRole-api-provider";

// // export default function CreateDepartmentRole({
// //   showDepartmentRole,
// //   editDepartmentRole,
// //   editDept,
// //   onClose,
// //   setShowNewRole,
// //   setEditRoleOnly,
// //   setEditRole,
// // }) {
// //   const initialForm = {
// //     department_name: "",
// //     code: "",
// //     branch: "",
// //     description: "",
// //   };

// //   const [form, setForm] = useState(initialForm);
// //   const [roles, setRoles] = useState([]);
// //   const [branchList, setBranchList] = useState([]);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [rolesLoading, setRolesLoading] = useState(false);

// //   /* LOAD BRANCHES */
// //   useEffect(() => {
// //     departmentRoleApiProvider
// //       .fetchBranches()
// //       .then((res) => setBranchList(res || []))
// //       .catch(() => toast.error("Failed to load branches"));
// //   }, []);

// //   const handleChange = (e) => {
// //   const { id, value } = e.target;

// //   // Department Name: letters + space only
// //   if (id === "department_name") {
// //     if (!/^[a-zA-Z\s]*$/.test(value)) return;
// //   }

// //   // Code: letters + numbers only (no space)
// //   if (id === "code") {
// //     if (!/^[a-zA-Z0-9]*$/.test(value)) return;
// //   }

// //   setForm((prev) => ({
// //     ...prev,
// //     [id]: id === "branch" ? Number(value) : value,
// //   }));
// // };


// //   /* EDIT MODE PREFILL */
// //   useEffect(() => {
// //     if (!editDept?.id) {
// //       setForm(initialForm);
// //       setRoles([]);
// //       return;
// //     }

// //     setForm({
// //       department_name: editDept.department_name || "",
// //       code: editDept.code || "",
// //       branch:
// //         typeof editDept.branch === "object"
// //           ? editDept.branch.id
// //           : editDept.branch || "",
// //       description: editDept.description || "",
// //     });

// //     fetchRoles(editDept.id);
// //   }, [editDept]);

// //   const fetchRoles = async (id) => {
// //     setRolesLoading(true);
// //     try {
// //       const res = await departmentRoleApiProvider.fetchRoles(id);
// //       setRoles(res || []);
// //     } catch {
// //       toast.error("Failed to load roles");
// //     } finally {
// //       setRolesLoading(false);
// //     }
// //   };

// //   const handleChange = (e) => {
// //     const { id, value } = e.target;
// //     setForm((p) => ({ ...p, [id]: id === "branch" ? Number(value) : value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsLoading(true);
// //     try {
// //       if (editDept?.id) {
// //         await departmentRoleApiProvider.updateDepartment(editDept.id, form);
// //         toast.success("Department updated");
// //       } else {
// //         await departmentRoleApiProvider.createDepartment(form);
// //         toast.success("Department created");
// //       }
// //       onClose();
// //     } catch {
// //       toast.error("Save failed");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   /* ROLE TABLE */
// //   const renderRolesUI = () => (
// //     <table className="role-table">
// //       <thead>
// //         <tr>
// //           <th className="col-role">Role Name</th>
// //           <th className="col-desc">Description</th>
// //           <th className="col-action">Action</th>
// //         </tr>
// //       </thead>

// //       <tbody>
// //         {!editDept?.id ? (
// //           <tr>
// //             <td colSpan="3" className="table-empty">
// //               Save department to add roles
// //             </td>
// //           </tr>
// //         ) : rolesLoading ? (
// //           <tr>
// //             <td colSpan="3" className="table-empty">
// //               Loading roles...
// //             </td>
// //           </tr>
// //         ) : roles.length === 0 ? (
// //           <tr>
// //             <td colSpan="3" className="table-empty">
// //               No roles found
// //             </td>
// //           </tr>
// //         ) : (
// //           roles.map((role) => (
// //             <tr key={role.id}>
// //               <td className="col-role">{role.role}</td>
// //               <td className="col-desc">{role.description || "—"}</td>
// //               <td className="col-action">
// //                 <span
// //                   className="role-edit"
// //                   onClick={() => {
// //                     setEditRole(role);
// //                     setEditRoleOnly(true);
// //                     setShowNewRole(true);
// //                   }}
// //                 >
// //                   Edit
// //                 </span>
// //               </td>
// //             </tr>
// //           ))
// //         )}
// //       </tbody>
// //     </table>
// //   );

// //   return (
// //     <div
// //       className={`create-department-role-container ${
// //         showDepartmentRole ? "block" : ""
// //       }`}
// //     >
// //       <svg
// //         className="x-logo-create-department"
// //         viewBox="0 0 384 512"
// //         onClick={onClose}
// //       >
// //         <path d="M342.6 150.6L192 301.3 41.4 150.6" />
// //       </svg>

// //       <div className="create-department-head">
// //         <p>{editDept?.id ? "Edit" : "Create New"} Department</p>
// //       </div>

// //       <form onSubmit={handleSubmit} className="create-department-body">
// //         <div className="create-department-content">
// //           <Input
// //             id="department_name"
// //             label="Department Name"
// //             required
// //             value={form.department_name}
// //             onChange={handleChange}
// //           />
// //           <Input
// //             id="code"
// //             label="Code"
// //             required
// //             value={form.code}
// //             onChange={handleChange}
// //           />
// //         </div>

// //         <Select
// //           id="branch"
// //           label="Branch"
// //           required
// //           value={form.branch}
// //           onChange={handleChange}
// //           options={branchList}
// //         />

// //         <Input
// //           id="description"
// //           label="Description"
// //           value={form.description}
// //           onChange={handleChange}
// //         />

// //         {/* ROLES HEADER */}
// //         <div className="display-role-cointainer-title">
// //           <nav>
// //             <p>Roles</p>
// //             {/* <button
// //               type="button"
// //               disabled={!editDept?.id}
// //               onClick={() => {
// //                 setEditRole({});
// //                 setEditRoleOnly(false);
// //                 setShowNewRole(true);
// //               }}
// //             >
// //               + Add Role
// //             </button> */}
// //            <button
// //   type="button"
// //   onClick={(e) => {
// //     e.preventDefault();
// //     e.stopPropagation();

// //     if (
// //       !form.department_name.trim() ||
// //       !form.code.trim() ||
// //       !form.branch
// //     ) {
// //       toast.warning("Please fill department details before adding roles");
// //       return;
// //     }

// //     setEditRole({});
// //     setEditRoleOnly(false);
// //     setShowNewRole(true);
// //   }}
// // >
// //   + Add Role
// //           </button>
// //           </nav>
// //         </div>

// //         {/* ROLES TABLE */}
// //         <div className="display-role-cointainer">
// //           {renderRolesUI()}
// //         </div>

// //         {/* ACTIONS */}
// //         <div className="create-department-submit-container">
// //           <button
// //             type="button"
// //             className="create-department-cancel"
// //             onClick={onClose}
// //           >
// //             Cancel
// //           </button>
// //           <button
// //             type="submit"
// //             className="create-department-save"
// //             disabled={isLoading}
// //           >
// //             {isLoading ? "Saving..." : "Save"}
// //           </button>
// //         </div>
// //       </form>
// //     </div>
// //   );
// // }

// // /* INPUT */
// // const Input = ({ label, id, ...props }) => (
// //   <div className="create-department-box">
// //     <label htmlFor={id}>
// //       {label} {props.required && <sup>*</sup>}
// //     </label>
// //     <input id={id} {...props} />
// //   </div>
// // );

// // /* SELECT */
// // const Select = ({ label, id, options, ...props }) => (
// //   <div
// //     className="create-department-box"
// //     id="create-department-box-fullwidth"
// //   >
// //     <label htmlFor={id}>
// //       {label} {props.required && <sup>*</sup>}
// //     </label>
// //     <select id={id} {...props}>
// //       <option value="">Select {label}</option>
// //       {options.map((o) => (
// //         <option key={o.id} value={o.id}>
// //           {o.name}
// //         </option>
// //       ))}
// //     </select>
// //   </div>
// // );
// import React, { useEffect, useState } from "react";
// import "./createDepartmentrole.css";
// import { toast } from "react-toastify";
// import departmentRoleApiProvider from "../../../network/departmentRole-api-provider";

// export default function CreateDepartmentRole({
//   showDepartmentRole,
//   editDept,
//   onClose,
//   setShowNewRole,
//   setEditRoleOnly,
//   setEditRole,
// }) {
//   const initialForm = {
//     department_name: "",
//     code: "",
//     branch: "",
//     description: "",
//   };

//   const [form, setForm] = useState(initialForm);
//   const [roles, setRoles] = useState([]);
//   const [branchList, setBranchList] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [rolesLoading, setRolesLoading] = useState(false);

//   /* LOAD BRANCHES */
//   useEffect(() => {
//     departmentRoleApiProvider
//       .fetchBranches()
//       .then((res) => setBranchList(res || []))
//       .catch(() => toast.error("Failed to load branches"));
//   }, []);

//   /* PREFILL EDIT MODE */
//   useEffect(() => {
//     if (!editDept?.id) {
//       setForm(initialForm);
//       setRoles([]);
//       return;
//     }

//     setForm({
//       department_name: editDept.department_name || "",
//       code: editDept.code || "",
//       branch:
//         typeof editDept.branch === "object"
//           ? editDept.branch.id
//           : editDept.branch || "",
//       description: editDept.description || "",
//     });

//     fetchRoles(editDept.id);
//   }, [editDept]);

//   /* FETCH ROLES */
//   const fetchRoles = async (id) => {
//     setRolesLoading(true);
//     try {
//       const res = await departmentRoleApiProvider.fetchRoles(id);
//       setRoles(res || []);
//     } catch {
//       toast.error("Failed to load roles");
//     } finally {
//       setRolesLoading(false);
//     }
//   };

//   /* INPUT CHANGE */
//   const handleChange = (e) => {
//     const { id, value } = e.target;

//     if (id === "department_name" && !/^[a-zA-Z\s]*$/.test(value)) return;
//     if (id === "code" && !/^[a-zA-Z0-9]*$/.test(value)) return;
//     if (id === "description" && value.length > 500) return;

//     setForm((prev) => ({
//       ...prev,
//       [id]: id === "branch" ? Number(value) : value,
//     }));
//   };

//   /* SAVE DEPARTMENT */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setIsLoading(true);
//     try {
//       if (editDept?.id) {
//         await departmentRoleApiProvider.updateDepartment(editDept.id, form);
//         toast.success("Department updated");
//       } else {
//         await departmentRoleApiProvider.createDepartment(form);
//         toast.success("Department created");
//       }
//       onClose();
//     } catch {
//       toast.error("Save failed");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /* CAN OPEN ROLE MODAL */
//   const canOpenRole =
//     form.department_name.trim() &&
//     form.code.trim() &&
//     form.branch;

//   /* ROLE TABLE */
//   const renderRolesUI = () => (
//     <table className="role-table">
//       <thead>
//         <tr>
//           <th>Role Name</th>
//           <th>Description</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {!canOpenRole ? (
//           <tr>
//             <td colSpan="3" className="table-empty">
//               Fill department details to add roles
//             </td>
//           </tr>
//         ) : !editDept?.id ? (
//           <tr>
//             <td colSpan="3" className="table-empty">
//               No roles added yet
//             </td>
//           </tr>
//         ) : rolesLoading ? (
//           <tr>
//             <td colSpan="3" className="table-empty">
//               Loading roles...
//             </td>
//           </tr>
//         ) : roles.length === 0 ? (
//           <tr>
//             <td colSpan="3" className="table-empty">
//               No roles found
//             </td>
//           </tr>
//         ) : (
//           roles.map((role) => (
//             <tr key={role.id}>
//               <td>{role.role}</td>
//               <td>{role.description || "—"}</td>
//               <td>
//                 <span
//                   className="role-edit"
//                   onClick={() => {
//                     setEditRole(role);
//                     setEditRoleOnly(true);
//                     setShowNewRole(true);
//                   }}
//                 >
//                   Edit
//                 </span>
//               </td>
//             </tr>
//           ))
//         )}
//       </tbody>
//     </table>
//   );

//   return (
//     <div
//       className={`create-department-role-container ${
//         showDepartmentRole ? "block" : ""
//       }`}
//     >
//       <svg
//         className="x-logo-create-department"
//         viewBox="0 0 384 512"
//         onClick={onClose}
//       >
//         <path d="M342.6 150.6L192 301.3 41.4 150.6" />
//       </svg>

//       <div className="create-department-head">
//         <p>{editDept?.id ? "Edit" : "Create New"} Department</p>
//       </div>

//       <form onSubmit={handleSubmit} className="create-department-body">
//         <div className="create-department-content">
//           <Input
//             id="department_name"
//             label="Department Name"
//             required
//             value={form.department_name}
//             onChange={handleChange}
//           />
//           <Input
//             id="code"
//             label="Code"
//             required
//             value={form.code}
//             onChange={handleChange}
//           />
//         </div>

//         <Select
//           id="branch"
//           label="Branch"
//           required
//           value={form.branch}
//           onChange={handleChange}
//           options={branchList}
//         />

//         <Input
//           id="description"
//           label="Description"
//           value={form.description}
//           onChange={handleChange}
//         />

//         {/* ROLES */}
//         <div className="display-role-cointainer-title">
//           <nav>
//             <p>Roles</p>
//             <button
//               type="button"
//               onClick={() => {
//                 if (!canOpenRole) {
//                   toast.warning("Please fill department details first");
//                   return;
//                 }

//                 setEditRole({
//                   department_name: form.department_name,
//                   code: form.code,
//                   branch: form.branch,
//                 });
//                 setEditRoleOnly(false);
//                 setShowNewRole(true);
//               }}
//             >
//               + Add Role
//             </button>
//           </nav>
//         </div>

//         <div className="display-role-cointainer">{renderRolesUI()}</div>

//         <div className="create-department-submit-container">
//           <button
//             type="button"
//             className="create-department-cancel"
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="create-department-save"
//             disabled={isLoading}
//           >
//             {isLoading ? "Saving..." : "Save"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// /* INPUT */
// const Input = ({ label, id, ...props }) => (
//   <div className="create-department-box">
//     <label htmlFor={id}>
//       {label} {props.required && <sup>*</sup>}
//     </label>
//     <input id={id} {...props} />
//   </div>
// );

// /* SELECT */
// const Select = ({ label, id, options, ...props }) => (
//   <div
//     className="create-department-box"
//     id="create-department-box-fullwidth"
//   >
//     <label htmlFor={id}>
//       {label} {props.required && <sup>*</sup>}
//     </label>
//     <select id={id} {...props}>
//       <option value="">Select {label}</option>
//       {options.map((o) => (
//         <option key={o.id} value={o.id}>
//           {o.name}
//         </option>
//       ))}
//     </select>
//   </div>
// );

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

  /* FETCH ROLES */
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
        toast.success("Department updated");
      } else {
        await departmentRoleApiProvider.createDepartment(form);
        toast.success("Department created");
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
                  Edit
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
      {/* <svg
        className="x-logo-create-department"
        viewBox="0 0 384 512"
        onClick={onClose}
      >
        <path d="M342.6 150.6L192 301.3 41.4 150.6" />
      </svg> */}

      <div className="create-department-head">
        <p>{editDept?.id ? "Edit" : "Create New"} Department</p>
      </div>

      <form onSubmit={handleSubmit} className="create-department-body">
        <div className="create-department-content">
          <Input
            id="department_name"
            label="Department Name"
            required
            value={form.department_name}
            onChange={handleChange}
          />
          <Input
            id="code"
            label="Code"
            required
            value={form.code}
            onChange={handleChange}
          />
        </div>

        <Select
          id="branch"
          label="Branch"
          required
          value={form.branch}
          onChange={handleChange}
          options={branchList}
        />

        <Input
          id="description"
          label="Description"
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
