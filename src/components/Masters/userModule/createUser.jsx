// import React, { useState, useEffect } from "react";
// import "./createUser.css";
// import { toast } from "react-toastify";
// import userApiProvider from "../../../network/user-api-provider";

// export default function CreateUser({
//   showCreateUser,
//   editCreateUser,
//   edituser,
//   fetchUsers,
//   onClose,
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
//     available_branches: [],
//     employee_id: "",
//   };

//   const [createUserForm, setcreateUserForm] = useState(initialForm);
//   const [branchList, setBranchList] = useState([]);
//   const [departmentList, setDepartmentList] = useState([]);
//   const [roleList, setRoleList] = useState([]);
//   const [reportingUsers, setReportingUsers] = useState([]);

//   // ==========================
//   // Prefill on Edit
//   // ==========================
//   useEffect(() => {
//     if (!editCreateUser || !edituser?.id) {
//       setcreateUserForm(initialForm);
//       return;
//     }

//     setcreateUserForm({
//       first_name: edituser.first_name || "",
//       last_name: edituser.last_name || "",
//       email: edituser.email || "",
//       contact_number: edituser.contact_number || "",
//       employee_id: edituser.employee_id || "",
//       branch: edituser.branch?.id || "",
//       department: edituser.department?.id || "",
//       role: edituser.role?.id || "",
//       reporting_to: edituser.reporting_to || "",
//       available_branches: Array.isArray(edituser.available_branches)
//         ? edituser.available_branches.join(", ")
//         : "",
//     });
//   }, [editCreateUser, edituser]);

//   // ==========================
//   // Fetch Branches
//   // ==========================
//   useEffect(() => {
//     const loadBranches = async () => {
//       const branches = await userApiProvider.fetchBranches();
//       setBranchList(branches || []);
//     };
//     loadBranches();
//   }, []);

//   // ==========================
//   // Fetch Departments by Branch
//   // ==========================
//   useEffect(() => {
//     if (!createUserForm.branch) {
//       setDepartmentList([]);
//       return;
//     }

//     const loadDepartments = async () => {
//       const departments = await userApiProvider.fetchDepartments(
//         createUserForm.branch // ✅ branchId
//       );
//       setDepartmentList(departments || []);
//     };

//     loadDepartments();
//   }, [createUserForm.branch]);

//   // ==========================
//   // Fetch Roles by Department
//   // ==========================
//   useEffect(() => {
//     if (!createUserForm.department) {
//       setRoleList([]);
//       return;
//     }

//     const loadRoles = async () => {
//       const roles = await userApiProvider.fetchRoles(
//         createUserForm.department // ✅ departmentId
//       );
//       setRoleList(roles || []);
//     };

//     loadRoles();
//   }, [createUserForm.department]);

//   // ==========================
//   // Fetch Reporting Users
//   // ==========================
//   useEffect(() => {
//     const loadReportingUsers = async () => {
//       const res = await userApiProvider.fetchUsers(1, "");
//       setReportingUsers(res?.users || []);
//     };
//     loadReportingUsers();
//   }, []);

//   // ==========================
//   // Handle Input Change
//   // ==========================
//   const handleFormChange = (e) => {
//     const { id, value } = e.target;

//     setcreateUserForm((prev) => ({
//       ...prev,
//       [id]: value,
//       ...(id === "branch" ? { department: "", role: "" } : {}),
//       ...(id === "department" ? { role: "" } : {}),
//     }));
//   };

//   // ==========================
//   // Submit
//   // ==========================
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
//       onClose();
//       fetchUsers();
//     }
//   };

//   // ==========================
//   // UI
//   // ==========================
//   return (
//     <div className={`createuser-container ${showCreateUser ? "block" : ""}`}>
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
//           <div className="createuser-content">
//             <Input label="First Names" placeholder="Enter Your First Name" required id="first_name" value={createUserForm.first_name} onChange={handleFormChange} />
//             <Input label="Last Name" placeholder="Enter Your Last Name" required id="last_name" value={createUserForm.last_name} onChange={handleFormChange} />
//           </div>

//           <div className="createuser-content">
//             <Input label="Email" placeholder="Enter Your Email" required id="email" disabled={editCreateUser} value={createUserForm.email} onChange={handleFormChange} />
//             <Input label="Contact Number" placeholder="Enter Your Contact Number" id="contact_number" value={createUserForm.contact_number} onChange={handleFormChange} />
//           </div>

//           <div className="createuser-content">
//             <Select label="Branch" placeholder="Select Branch" required id="branch" value={createUserForm.branch} onChange={handleFormChange}
//               options={branchList.map(b => ({ id: b.id, name: b.name }))} />

//             <Select label="Department" placeholder="Select Department" required id="department" value={createUserForm.department} onChange={handleFormChange}
//               options={departmentList.map(d => ({ id: d.id, name: d.department_name }))} />
//           </div>

//           <div className="createuser-content">
//             <Select label="Role" placeholder="Select Role" required id="role" value={createUserForm.role} onChange={handleFormChange}
//               options={roleList.map(r => ({ id: r.id, name: r.role }))} />

//             <Select label="Reporting To" placeholder="Enter Reporting Manager" id="reporting_to" value={createUserForm.reporting_to} onChange={handleFormChange}
//               options={reportingUsers
//                 .filter(u => u.id !== edituser?.id)
//                 .map(u => ({ id: u.id, name: `${u.first_name} ${u.last_name} (${u.email})` }))} />
//           </div>

//           <div className="createuser-content">
//             <Select label="Available Branches" placeholder="Select Avaliables Branch" required id="Available branches" value={createUserForm.available_branches} onChange={handleFormChange}
//               options={branchList.map(b => ({ id: b.id, name: b.name }))} />
//             <Input label="TMS User ID" id="employee_id" disabled={editCreateUser} value={createUserForm.employee_id} onChange={handleFormChange} />
//           </div>

//           <div className="createuser-submit-container">
//             <button type="button" className="createuser-cancel" onClick={onClose}>Cancel</button>
//             <button type="submit" className="createuser-save">Save</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// /* ---------- Helper Components ---------- */
// const Input = ({ label, id, ...props }) => (
//   <div className="createuser-box">
//     <label htmlFor={id}>{label}{props.required && <sup>*</sup>}</label>
//     <input id={id} {...props} />
//   </div>
// );

// const Select = ({ label, id, options, ...props }) => (
//   <div className="createuser-box">
//     <label htmlFor={id}>{label}{props.required && <sup>*</sup>}</label>
//     <select id={id} {...props}>
//       <option value="">Select {label}</option>
//       {options.map(opt => (
//         <option key={opt.id} value={opt.id}>{opt.name}</option>
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
    available_branches: [], // ✅ array
    employee_id: "",
  };

  const [createUserForm, setcreateUserForm] = useState(initialForm);
  const [branchList, setBranchList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [reportingUsers, setReportingUsers] = useState([]);

  /* ==========================
     Prefill on Edit
  ========================== */
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
        ? edituser.available_branches
        : [],
    });
  }, [editCreateUser, edituser]);

  /* ==========================
     Fetch Branches
  ========================== */
  useEffect(() => {
    const loadBranches = async () => {
      const branches = await userApiProvider.fetchBranches();
      setBranchList(branches || []);
    };
    loadBranches();
  }, []);

  /* ==========================
     Fetch Departments
  ========================== */
  useEffect(() => {
    if (!createUserForm.branch) {
      setDepartmentList([]);
      return;
    }

    userApiProvider
      .fetchDepartments(createUserForm.branch)
      .then(res => setDepartmentList(res || []));
  }, [createUserForm.branch]);

  /* ==========================
     Fetch Roles
  ========================== */
  useEffect(() => {
    if (!createUserForm.department) {
      setRoleList([]);
      return;
    }

    userApiProvider
      .fetchRoles(createUserForm.department)
      .then(res => setRoleList(res || []));
  }, [createUserForm.department]);

  /* ==========================
     Fetch Reporting Users
  ========================== */
  useEffect(() => {
    userApiProvider.fetchUsers(1, "").then(res => {
      setReportingUsers(res?.users || []);
    });
  }, []);

  /* ==========================
     Handle Change
  ========================== */
  const handleFormChange = (e) => {
    const { id, value, multiple, options } = e.target;

    if (multiple) {
      const selectedValues = Array.from(options)
        .filter(opt => opt.selected)
        .map(opt => opt.value);

      setcreateUserForm(prev => ({
        ...prev,
        [id]: selectedValues,
      }));
      return;
    }

    setcreateUserForm(prev => ({
      ...prev,
      [id]: value,
      ...(id === "branch" ? { department: "", role: "" } : {}),
      ...(id === "department" ? { role: "" } : {}),
    }));
  };

  /* ==========================
     Submit
  ========================== */
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
        available_branches: createUserForm.available_branches, // ✅ array
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

  /* ==========================
     UI
  ========================== */
  return (
    <div className={`createuser-container ${showCreateUser ? "block" : ""}`}>
      <div className="createuser-head">
        <p>{editCreateUser ? "Edit" : "Create New"} User</p>
      </div>

      <div className="createuser-body">
        <form onSubmit={handleSubmit}>
          <div className="createuser-content">
            <Input label="First Name" placeholder="Enter Your First Name" required id="first_name" value={createUserForm.first_name} onChange={handleFormChange} />
            <Input label="Last Name" placeholder="Enter Your Last Name" required id="last_name" value={createUserForm.last_name} onChange={handleFormChange} />
          </div>

          <div className="createuser-content">
            <Input label="Email" placeholder="Enter Your Email" required id="email" disabled={editCreateUser} value={createUserForm.email} onChange={handleFormChange} />
            <Input label="Contact Number" placeholder="Enter Your Contact Number" id="contact_number" value={createUserForm.contact_number} onChange={handleFormChange} />
          </div>

          <div className="createuser-content">
            <Select label="Branch" placeholder="Select Branch" required id="branch" value={createUserForm.branch} onChange={handleFormChange}
              options={branchList.map(b => ({ id: b.id, name: b.name }))} />

            <Select label="Department" placeholder="Select Department" required id="department" value={createUserForm.department} onChange={handleFormChange}
              options={departmentList.map(d => ({ id: d.id, name: d.department_name }))} />
          </div>

          <div className="createuser-content">
            <Select label="Role" placeholder="Select Role" required id="role" value={createUserForm.role} onChange={handleFormChange}
              options={roleList.map(r => ({ id: r.id, name: r.role }))} />

            <Select label="Reporting To" placeholder="Enter Reporting Manager" id="reporting_to" value={createUserForm.reporting_to} onChange={handleFormChange}
              options={reportingUsers.map(u => ({
                id: u.id,
                name: `${u.first_name} ${u.last_name}`,
              }))} />
          </div>

          <div className="createuser-content">
            {/* ✅ MULTI SELECT */}
            <Select
             label="Available Branches"
             id="available_branches"
             placeholder="Select Available Branches"
              required
                // ✅ this is the ONLY difference
             value={createUserForm.available_branches}
             onChange={handleFormChange}
             options={branchList.map(b => ({
            id: b.id,
            name: b.name,
            }))}
        />
            <Input label="TMS User ID" placeholder="Enter Your TMS User ID" id="employee_id" disabled={editCreateUser} value={createUserForm.employee_id} onChange={handleFormChange} />
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
      {!props.multiple && <option value="">Select {label}</option>}
      {options.map(opt => (
        <option key={opt.id} value={opt.id}>{opt.name}</option>
      ))}
    </select>
  </div>
);
