// import React, { useState } from "react";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();
//     console.log("Login attempt:", { email, password });
//     alert("✅ Login button clicked!");
//   };

//   return (
//     <div style={{
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       minHeight: "80vh",
//       backgroundColor: "#f9f9f9",
//     }}>
//       <form onSubmit={handleLogin} style={{
//         background: "white",
//         padding: "30px",
//         borderRadius: "12px",
//         boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
//         width: "350px",
//       }}>
//         <h2 style={{ textAlign: "center", color: "#007bff" }}>Login</h2>

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           style={{ width: "100%", padding: "12px", margin: "10px 0",
//             borderRadius: "8px", border: "1px solid #ddd" }}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={{ width: "100%", padding: "12px", margin: "10px 0",
//             borderRadius: "8px", border: "1px solid #ddd" }}
//         />

//         <button type="submit" style={{
//           width: "100%", padding: "12px", marginTop: "10px",
//           borderRadius: "8px", border: "none",
//           backgroundColor: "#007bff", color: "white", fontSize: "16px"
//         }}>
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Login;
