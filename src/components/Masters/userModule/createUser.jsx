// // import React, { useState, useEffect } from "react";
// // import "./createUser.css";
// // import { toast } from "react-toastify";
// // import { useNavigate } from "react-router-dom";
// // import userApiProvider from "../../../network/user-api-provider";


// // export default function CreateUser({
// //   showCreateUser,
// //   setshowCreateUser,
// //   editCreateUser,
// //   edituser,
// //   setedituser,
// // }) {
// //   const navigate = useNavigate();

// //   const initialForm = {
// //     first_name: "",
// //     last_name: "",
// //     email: "",
// //     contact_number: "",
// //     branch: "",
// //     department: "",
// //     role: "",
// //     reporting_to: "",
// //     available_branches: "",
// //     employee_id: "",
// //   };

// //   const [createUserForm, setcreateUserForm] = useState(initialForm);

// //   const [branchList, setBranchList] = useState([]);
// //   const [departmentList, setDepartmentList] = useState([]);
// //   const [roleList, setRoleList] = useState([]);
// //   const [filteredRoles, setFilteredRoles] = useState([]);

// //   // =============================================
// //   // Prefill on Edit
// //   // =============================================
// //   useEffect(() => {
// //     if (!editCreateUser || !edituser?.id) {
// //       setcreateUserForm(initialForm);
// //       return;
// //     }

// //     setcreateUserForm({
// //       first_name: edituser.first_name || "",
// //       last_name: edituser.last_name || "",
// //       email: edituser.email || "",
// //       contact_number: edituser.profile?.contact_number || "",
// //       employee_id: edituser.profile?.employee_id || "",
// //       branch: edituser.profile?.branch?.id || "",
// //       department: edituser.profile?.department?.id || "",
// //       role: edituser.profile?.role?.id || "",
// //       reporting_to: edituser.profile?.reporting_to || "",
// //       available_branches:
// //         Array.isArray(edituser.profile?.available_branches)
// //           ? edituser.profile.available_branches.join(", ")
// //           : "",
// //     });
// //   }, [edituser, editCreateUser]);

  

// //   // =============================================
// //   // Fetch Dropdown Data
// //   // =============================================
// //   useEffect(() => {
// //     const loadData = async () => {
// //       const branches = await userApiProvider.fetchBranches();
// //       const departments = await userApiProvider.fetchDepartments();
// //       const roles = await userApiProvider.fetchRoles(createUserForm.department);

// //       setBranchList(branches);
// //       setDepartmentList(departments);
// //       setRoleList(roles);
// //     };

// //     loadData();
// //   }, [createUserForm.department]);

// //   // =============================================
// //   // Filter Roles based on Department
// //   // =============================================
// //   useEffect(() => {
// //   if (!createUserForm.department || roleList.length === 0) {
// //     setFilteredRoles([]);
// //     return;
// //   }

// //   const selectedDept = departmentList.find(
// //     (d) => Number(d.id) === Number(createUserForm.department)
// //   );

// //   if (!selectedDept) {
// //     setFilteredRoles([]);
// //     return;
// //   }

// //   const deptName = selectedDept.department_name.toLowerCase();

// //   const filtered = roleList.filter((role) =>
// //     role.department_name?.toLowerCase() === deptName
// //   );

// //   setFilteredRoles(filtered);
// // }, [createUserForm.department, roleList, departmentList]);


// //   // =============================================
// //   // Handle Form Change
// //   // =============================================
// //   const handleFormChange = (e) => {
// //     const { id, value } = e.target;

// //     setcreateUserForm((prev) => ({
// //       ...prev,
// //       [id]: value,
// //       ...(id === "department" ? { role: "" } : {}), // reset role on department change
// //     }));
// //   };

// //   // =============================================
// //   // Submit Handler (Create + Edit)
// //   // =============================================
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     const baseData = {
// //       first_name: createUserForm.first_name,
// //       last_name: createUserForm.last_name,
// //       profile: {
// //         contact_number: createUserForm.contact_number,
// //         branch: createUserForm.branch,
// //         department: createUserForm.department,
// //         role: createUserForm.role,
// //         reporting_to: createUserForm.reporting_to || null,
// //         available_branches: createUserForm.available_branches
// //           .split(",")
// //           .map((b) => b.trim())
// //           .filter(Boolean),
// //       },
// //     };

// //     let response = null;

// //     if (editCreateUser) {
// //       response = await userApiProvider.updateUser(edituser.id, baseData);
// //     } else {
// //       response = await userApiProvider.createUser({
// //         ...baseData,
// //         email: createUserForm.email,
// //         password: "defaultPassword123",
// //         profile: {
// //           ...baseData.profile,
// //           employee_id: createUserForm.employee_id,
// //         },
// //       });
// //     }

// //     if (response) {
// //       toast.success(editCreateUser ? "User updated" : "User created");

// //       await fetchUsers(); 
// //       setcreateUserForm(initialForm);
// //       setedituser({});
// //       setshowCreateUser(false);
      
// //     }
// //   };

// //   // =============================================
// //   // JSX UI Rendering
// //   // =============================================
// //   return (
// //     <div className={`createuser-container ${showCreateUser ? "block" : "hidden"}`}>
// //       <svg
// //         className="x-logo-createuser"
// //         xmlns="http://www.w3.org/2000/svg"
// //         viewBox="0 0 384 512"
// //         onClick={() => {
// //           setshowCreateUser(false);
// //           setedituser({});
// //         }}
// //       >
// //         <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
// //       </svg>

// //       <div className="createuser-head">
// //         <p>{editCreateUser ? "Edit" : "Create New"} User</p>
// //       </div>

// //       <div className="createuser-body">
// //         <form onSubmit={handleSubmit}>

// //           {/* FIRST ROW */}
// //           <div className="createuser-content">
// //             <Input label="First Name" required id="first_name"
// //               value={createUserForm.first_name}
// //               placeholder="Enter Your First Name"
// //               onChange={handleFormChange}
// //             />
// //             <Input label="Last Name" required id="last_name"
// //               value={createUserForm.last_name}
// //               placeholder="Enter Your Last Name"
// //               onChange={handleFormChange}
// //             />
// //           </div>

// //           {/* SECOND ROW */}
// //           <div className="createuser-content">
// //             <Input label="Email" required id="email" disabled={editCreateUser}
// //               value={createUserForm.email}
// //               placeholder="Enter Your Email"
// //               onChange={handleFormChange}
// //             />
// //             <Input label="Contact Number" id="contact_number" type="number"
// //               value={createUserForm.contact_number}
// //               placeholder="Enter Your Contact Number"
// //               onChange={handleFormChange}
// //             />
// //           </div>

// //           {/* THIRD ROW */}
// //           <div className="createuser-content">
// //             <Select
// //               label="Branch"
// //               id="branch"
// //               required
// //               value={createUserForm.branch}
// //               onChange={handleFormChange}
// //               options={branchList.map((b) => ({ id: b.id, name: b.name }))}
// //             />

// //             <Select
// //               label="Department"
// //               id="department"
// //               required
// //               value={createUserForm.department}
// //               onChange={handleFormChange}
// //               options={departmentList.map((d) => ({
// //                 id: d.id,
// //                 name: d.department_name,
// //               }))}
// //             />
// //           </div>

// //           {/* FOURTH ROW */}
// //           <div className="createuser-content">
// //             <Select
// //               label="Role"
// //               id="role"
// //               required
// //               value={createUserForm.role}
// //               onChange={handleFormChange}
// //               options={filteredRoles.map((r) => ({ id: r.id, name: r.role }))}
// //             />

// //             <Input label="Reporting To" id="reporting_to"
// //               value={createUserForm.reporting_to}
// //               placeholder="Enter Reporting Manager"
// //               onChange={handleFormChange}
// //             />
// //           </div>

// //           {/* FIFTH ROW */}
// //           <div className="createuser-content">
// //             <Input label="Available Branches" id="available_branches"
// //               placeholder="e.g., 1,2"
// //               value={createUserForm.available_branches}
// //               onChange={handleFormChange}
// //             />

// //             <Input label="TMS User ID" id="tms_user_id"
// //               disabled={editCreateUser}
// //               placeholder="Enter TMS User Id"
// //               value={createUserForm.employee_id}
// //               onChange={handleFormChange}
// //             />
// //           </div>

// //           {/* ACTIONS */}
// //           <div className="createuser-submit-container">
// //             <button
// //               type="button"
// //               className="createuser-cancel"
// //               onClick={() => {
// //                 setshowCreateUser(false);
// //                 setedituser({});
// //               }}
// //             >
// //               Cancel
// //             </button>

// //             <button type="submit" className="createuser-save">
// //               Save
// //             </button>
// //           </div>

// //         </form>
// //       </div>
// //     </div>
// //   );
// // }

// // /* Small helper components (clean UI) */
// // const Input = ({ label, id, ...props }) => (
// //   <div className="createuser-box">
// //     <label htmlFor={id}>
// //       {label}
// //       {props.required && <sup>*</sup>}
// //     </label>
// //     <input id={id} {...props} />
// //   </div>
// // );

// // const Select = ({ label, id, options, ...props }) => (
// //   <div className="createuser-box">
// //     <label htmlFor={id}>
// //       {label}
// //       {props.required && <sup>*</sup>}
// //     </label>
// //     <select id={id} className="candidate-input" {...props}>
// //       <option value="">Select {label}</option>
// //       {options.map((opt) => (
// //         <option key={opt.id} value={opt.id}>
// //           {opt.name}
// //         </option>
// //       ))}
// //     </select>
// //   </div>
// // );

// import React, { useState, useEffect } from "react";
// import "./createUser.css";
// import { toast } from "react-toastify";
// import userApiProvider from "../../../network/user-api-provider";

// export default function CreateUser({
//   showCreateUser,
//   editCreateUser,
//   edituser,
//   fetchUsers,
//   onClose, // ✅ parent-controlled close
// }) {
//   const initialForm = {
//     first_name: "",
//     last_name: "",
//     email: "",
//     contact_number: "",
//     branch: "",
//     department: "",
//     role: "",
//     reporting_to: "",
//     available_branches: "",
//     employee_id: "",
//   };

//   const [createUserForm, setcreateUserForm] = useState(initialForm);
//   const [reportingUsers, setReportingUsers] = useState([]);
//   const [branchList, setBranchList] = useState([]);
//   const [departmentList, setDepartmentList] = useState([]);
//   const [roleList, setRoleList] = useState([]);
//   const [filteredRoles, setFilteredRoles] = useState([]);

//   // =============================================
//   // Prefill on Edit
//   // =============================================
//  useEffect(() => {
//   if (!editCreateUser || !edituser?.id) {
//     setcreateUserForm(initialForm);
//     return;
//   }

//   setcreateUserForm({
//     first_name: edituser.first_name || "",
//     last_name: edituser.last_name || "",
//     email: edituser.email || "",

//     contact_number: edituser.contact_number || "",
//     employee_id: edituser.employee_id || "",

//     branch: edituser.branch?.id || "",
//     department: edituser.department?.id || "",
//     role: edituser.role?.id || "",

//     reporting_to: edituser.reporting_to || "",

//     available_branches: Array.isArray(edituser.available_branches)
//       ? edituser.available_branches.join(", ")
//       : "",
//   });
// }, [edituser, editCreateUser]);

// useEffect(() => {
//   const loadReportingUsers = async () => {
//     try {
//       const res = await userApiProvider.fetchUsers(1, "");
//       setReportingUsers(res?.users || []);
//     } catch (err) {
//       setReportingUsers([]);
//     }
//   };

//   loadReportingUsers();
// }, []);


//   // =============================================
//   // Fetch dropdown data
//   // =============================================
//   useEffect(() => {
//     const loadData = async () => {
//       const branches = await userApiProvider.fetchBranches();
//       const departments = await userApiProvider.fetchDepartments();
//       const roles = await userApiProvider.fetchRoles(
//         createUserForm.department
//       );

//       setBranchList(branches);
//       setDepartmentList(departments);
//       setRoleList(roles);
//     };

//     loadData();
//   }, [createUserForm.department]);

//   // =============================================
//   // Filter roles by department
//   // =============================================
//   useEffect(() => {
//     if (!createUserForm.department) {
//       setFilteredRoles([]);
//       return;
//     }

//     const selectedDept = departmentList.find(
//       (d) => Number(d.id) === Number(createUserForm.department)
//     );

//     if (!selectedDept) return;

//     const filtered = roleList.filter(
//       (r) =>
//         r.department_name?.toLowerCase() ===
//         selectedDept.department_name.toLowerCase()
//     );

//     setFilteredRoles(filtered);
//   }, [createUserForm.department, roleList, departmentList]);

//   // =============================================
//   // Handle input change
//   // =============================================
//   const handleFormChange = (e) => {
//     const { id, value } = e.target;

//     setcreateUserForm((prev) => ({
//       ...prev,
//       [id]: value,
//       ...(id === "department" ? { role: "" } : {}),
//     }));
//   };

//   // =============================================
//   // Submit handler
//   // =============================================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       first_name: createUserForm.first_name,
//       last_name: createUserForm.last_name,
//       profile: {
//         contact_number: createUserForm.contact_number,
//         branch: createUserForm.branch,
//         department: createUserForm.department,
//         role: createUserForm.role,
//         reporting_to: createUserForm.reporting_to || null,
//         available_branches: createUserForm.available_branches
//           .split(",")
//           .map((b) => b.trim())
//           .filter(Boolean),
//         employee_id: createUserForm.employee_id,
//       },
//     };

//     const response = editCreateUser
//       ? await userApiProvider.updateUser(edituser.id, payload)
//       : await userApiProvider.createUser({
//           ...payload,
//           email: createUserForm.email,
//           password: "defaultPassword123",
//         });

//     if (response) {
//       toast.success(editCreateUser ? "User updated" : "User created");
//       onClose(); // ✅ close modal correctly
//       await fetchUsers(); 
//     }
//   };

//   // =============================================
//   // UI
//   // =============================================
//   return (
//     <div className={`createuser-container ${showCreateUser ? "block" : ""}`}>
//       {/* CLOSE ICON */}
//       <svg
//         className="x-logo-createuser"
//         xmlns="http://www.w3.org/2000/svg"
//         viewBox="0 0 384 512"
//         onClick={onClose}
//       >
//         <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 
//         0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 
//         0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 
//         12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 
//         0L192 301.3 297.4 406.6c12.5 12.5 
//         32.8 12.5 45.3 0s12.5-32.8 
//         0-45.3L237.3 256 342.6 150.6z" />
//       </svg>

//       <div className="createuser-head">
//         <p>{editCreateUser ? "Edit" : "Create New"} User</p>
//       </div>

//       <div className="createuser-body">
//         <form onSubmit={handleSubmit}>
//           {/* ROW 1 */}
//           <div className="createuser-content">
//             <Input
//               label="First Name"
//               required
//               id="first_name"
//               value={createUserForm.first_name}
//               placeholder="Enter Your First Name"
//               onChange={handleFormChange}
//             />
//             <Input
//               label="Last Name"
//               required
//               id="last_name"
//               value={createUserForm.last_name}
//               placeholder="Enter Your Last Name"
//               onChange={handleFormChange}
//             />
//           </div>

//           {/* ROW 2 */}
//           <div className="createuser-content">
//             <Input
//               label="Email"
//               required
//               id="email"
//               disabled={editCreateUser}
//               value={createUserForm.email}
//               placeholder="Enter Your Email"
//               onChange={handleFormChange}
//             />
//             <Input
//               label="Contact Number"
//               id="contact_number"
//               type="number"
//               value={createUserForm.contact_number}
//               placeholder="Enter Contact Number"
//               onChange={handleFormChange}
//             />
//           </div>

//           {/* ROW 3 */}
//           <div className="createuser-content">
//             <Select
//               label="Branch"
//               required
//               id="branch"
//               value={createUserForm.branch}
//               onChange={handleFormChange}
//               options={branchList.map((b) => ({
//                 id: b.id,
//                 name: b.name,
//               }))}
//             />

//             <Select
//               label="Department"
//               required
//               id="department"
//               value={createUserForm.department}
//               onChange={handleFormChange}
//               options={departmentList.map((d) => ({
//                 id: d.id,
//                 name: d.department_name,
//               }))}
//             />
//           </div>

//           {/* ROW 4 */}
//           <div className="createuser-content">
//             <Select
//               label="Role"
//               required
//               id="role"
//               value={createUserForm.role}
//               onChange={handleFormChange}
//               options={filteredRoles.map((r) => ({
//                 id: r.id,
//                 name: r.role,
//               }))}
//             />

//             {/* <Input
//               label="Reporting To"
//               id="reporting_to"
//               value={createUserForm.reporting_to}
//               placeholder="Enter Reporting Manager"
//               onChange={handleFormChange}
//             /> */}
//             <Select
//               label="Reporting To"
//               id="reporting_to"
//               value={createUserForm.reporting_to}
//               onChange={handleFormChange}
//               options={reportingUsers
//                 .filter((u) => u.id !== edituser?.id) // prevent self-reporting
//                 .map((u) => ({
//                   id: u.id,
//                   name: `${u.first_name} ${u.last_name} (${u.email})`,
//                 }))
//               }
//             />
//           </div>

//           {/* ROW 5 */}
//           <div className="createuser-content">
//             <Input
//               label="Available Branches"
//               id="available_branches"
//               placeholder="e.g. 1,2"
//               value={createUserForm.available_branches}
//               onChange={handleFormChange}
//             />

//             <Input
//               label="TMS User ID"
//               id="employee_id"
//               disabled={editCreateUser}
//               placeholder="Enter TMS User Id"
//               value={createUserForm.employee_id}
//               onChange={handleFormChange}
//             />
//           </div>

//           {/* ACTIONS */}
//           <div className="createuser-submit-container">
//             <button
//               type="button"
//               className="createuser-cancel"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button type="submit" className="createuser-save">
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// /* ---------- Helper Components ---------- */
// const Input = ({ label, id, ...props }) => (
//   <div className="createuser-box">
//     <label htmlFor={id}>
//       {label}
//       {props.required && <sup>*</sup>}
//     </label>
//     <input id={id} {...props} />
//   </div>
// );

// const Select = ({ label, id, options, ...props }) => (
//   <div className="createuser-box">
//     <label htmlFor={id}>
//       {label}
//       {props.required && <sup>*</sup>}
//     </label>
//     <select id={id} {...props}>
//       <option value="">Select {label}</option>
//       {options.map((opt) => (
//         <option key={opt.id} value={opt.id}>
//           {opt.name}
//         </option>
//       ))}
//     </select>
//   </div>
// );
import React, { useState, useEffect } from "react";
import "./createUser.css";
import { toast } from "react-toastify";
import userApiProvider from "../../../network/user-api-provider";

export default function CreateUser({
  showCreateUser,
  editCreateUser,
  edituser,
  fetchUsers,
  onClose,
}) {
  const initialForm = {
    first_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    branch: "",
    department: "",
    role: "",
    reporting_to: "",
    available_branches: "",
    employee_id: "",
  };

  const [createUserForm, setcreateUserForm] = useState(initialForm);
  const [branchList, setBranchList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [reportingUsers, setReportingUsers] = useState([]);

  // ==========================
  // Prefill on Edit
  // ==========================
  useEffect(() => {
    if (!editCreateUser || !edituser?.id) {
      setcreateUserForm(initialForm);
      return;
    }

    setcreateUserForm({
      first_name: edituser.first_name || "",
      last_name: edituser.last_name || "",
      email: edituser.email || "",
      contact_number: edituser.contact_number || "",
      employee_id: edituser.employee_id || "",
      branch: edituser.branch?.id || "",
      department: edituser.department?.id || "",
      role: edituser.role?.id || "",
      reporting_to: edituser.reporting_to || "",
      available_branches: Array.isArray(edituser.available_branches)
        ? edituser.available_branches.join(", ")
        : "",
    });
  }, [editCreateUser, edituser]);

  // ==========================
  // Fetch Branches
  // ==========================
  useEffect(() => {
    const loadBranches = async () => {
      const branches = await userApiProvider.fetchBranches();
      setBranchList(branches || []);
    };
    loadBranches();
  }, []);

  // ==========================
  // Fetch Departments by Branch
  // ==========================
  useEffect(() => {
    if (!createUserForm.branch) {
      setDepartmentList([]);
      return;
    }

    const loadDepartments = async () => {
      const departments = await userApiProvider.fetchDepartments(
        createUserForm.branch // ✅ branchId
      );
      setDepartmentList(departments || []);
    };

    loadDepartments();
  }, [createUserForm.branch]);

  // ==========================
  // Fetch Roles by Department
  // ==========================
  useEffect(() => {
    if (!createUserForm.department) {
      setRoleList([]);
      return;
    }

    const loadRoles = async () => {
      const roles = await userApiProvider.fetchRoles(
        createUserForm.department // ✅ departmentId
      );
      setRoleList(roles || []);
    };

    loadRoles();
  }, [createUserForm.department]);

  // ==========================
  // Fetch Reporting Users
  // ==========================
  useEffect(() => {
    const loadReportingUsers = async () => {
      const res = await userApiProvider.fetchUsers(1, "");
      setReportingUsers(res?.users || []);
    };
    loadReportingUsers();
  }, []);

  // ==========================
  // Handle Input Change
  // ==========================
  const handleFormChange = (e) => {
    const { id, value } = e.target;

    setcreateUserForm((prev) => ({
      ...prev,
      [id]: value,
      ...(id === "branch" ? { department: "", role: "" } : {}),
      ...(id === "department" ? { role: "" } : {}),
    }));
  };

  // ==========================
  // Submit
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      first_name: createUserForm.first_name,
      last_name: createUserForm.last_name,
      profile: {
        contact_number: createUserForm.contact_number,
        branch: createUserForm.branch,
        department: createUserForm.department,
        role: createUserForm.role,
        reporting_to: createUserForm.reporting_to || null,
        available_branches: createUserForm.available_branches
          .split(",")
          .map((b) => b.trim())
          .filter(Boolean),
        employee_id: createUserForm.employee_id,
      },
    };

    const response = editCreateUser
      ? await userApiProvider.updateUser(edituser.id, payload)
      : await userApiProvider.createUser({
          ...payload,
          email: createUserForm.email,
          password: "defaultPassword123",
        });

    if (response) {
      toast.success(editCreateUser ? "User updated" : "User created");
      onClose();
      fetchUsers();
    }
  };

  // ==========================
  // UI
  // ==========================
  return (
    <div className={`createuser-container ${showCreateUser ? "block" : ""}`}>
      <svg
        className="x-logo-createuser"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        onClick={onClose}
      >
        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 
        0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 
        0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 
        12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 
        0L192 301.3 297.4 406.6c12.5 12.5 
        32.8 12.5 45.3 0s12.5-32.8 
        0-45.3L237.3 256 342.6 150.6z" />
      </svg>

      <div className="createuser-head">
        <p>{editCreateUser ? "Edit" : "Create New"} User</p>
      </div>

      <div className="createuser-body">
        <form onSubmit={handleSubmit}>
          <div className="createuser-content">
            <Input label="First Name" required id="first_name" value={createUserForm.first_name} onChange={handleFormChange} />
            <Input label="Last Name" required id="last_name" value={createUserForm.last_name} onChange={handleFormChange} />
          </div>

          <div className="createuser-content">
            <Input label="Email" required id="email" disabled={editCreateUser} value={createUserForm.email} onChange={handleFormChange} />
            <Input label="Contact Number" id="contact_number" value={createUserForm.contact_number} onChange={handleFormChange} />
          </div>

          <div className="createuser-content">
            <Select label="Branch" required id="branch" value={createUserForm.branch} onChange={handleFormChange}
              options={branchList.map(b => ({ id: b.id, name: b.name }))} />

            <Select label="Department" required id="department" value={createUserForm.department} onChange={handleFormChange}
              options={departmentList.map(d => ({ id: d.id, name: d.department_name }))} />
          </div>

          <div className="createuser-content">
            <Select label="Role" required id="role" value={createUserForm.role} onChange={handleFormChange}
              options={roleList.map(r => ({ id: r.id, name: r.role }))} />

            <Select label="Reporting To" id="reporting_to" value={createUserForm.reporting_to} onChange={handleFormChange}
              options={reportingUsers
                .filter(u => u.id !== edituser?.id)
                .map(u => ({ id: u.id, name: `${u.first_name} ${u.last_name} (${u.email})` }))} />
          </div>

          <div className="createuser-content">
            <Input label="Available Branches" id="available_branches" value={createUserForm.available_branches} onChange={handleFormChange} />
            <Input label="TMS User ID" id="employee_id" disabled={editCreateUser} value={createUserForm.employee_id} onChange={handleFormChange} />
          </div>

          <div className="createuser-submit-container">
            <button type="button" className="createuser-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="createuser-save">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ---------- Helper Components ---------- */
const Input = ({ label, id, ...props }) => (
  <div className="createuser-box">
    <label htmlFor={id}>{label}{props.required && <sup>*</sup>}</label>
    <input id={id} {...props} />
  </div>
);

const Select = ({ label, id, options, ...props }) => (
  <div className="createuser-box">
    <label htmlFor={id}>{label}{props.required && <sup>*</sup>}</label>
    <select id={id} {...props}>
      <option value="">Select {label}</option>
      {options.map(opt => (
        <option key={opt.id} value={opt.id}>{opt.name}</option>
      ))}
    </select>
  </div>
);
