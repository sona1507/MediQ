// ✅ Require a specific role (e.g., "pharmacist")
export default function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: `Access denied: requires ${role} role` });
    }
    next();
  };
}

// ✅ Require any of multiple roles (e.g., ["admin", "pharmacist"])
export function requireAnyRole(roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: `Access denied: requires one of [${roles.join(", ")}]` });
    }
    next();
  };
}
