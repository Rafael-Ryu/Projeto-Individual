const User = require("../models/userModel");

const requireAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  } else {
    return res.redirect("/login");
  }
};

const requireGuest = (req, res, next) => {
  if (req.session && req.session.userId) {
    return res.redirect("/dashboard");
  } else {
    return next();
  }
};

const addUserToLocals = async (req, res, next) => {
  if (req.session && req.session.userId) {
    try {
      const user = await User.getById(req.session.userId);
      res.locals.currentUser = user;
      res.locals.isAuthenticated = true;
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      res.locals.currentUser = null;
      res.locals.isAuthenticated = false;
    }
  } else {
    res.locals.currentUser = null;
    res.locals.isAuthenticated = false;
  }
  next();
};

const requireAdmin = async (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: "Não autenticado" });
  }

  try {
    const UsuarioCargo = require("../models/usuarioCargoModel");
    const Cargo = require("../models/cargoModel");

    const usuarioCargos = await UsuarioCargo.getByUsuarioId(req.session.userId);

    if (!usuarioCargos || usuarioCargos.length === 0) {
      return res
        .status(403)
        .json({ error: "Acesso negado. Nenhum cargo encontrado." });
    }

    let isAdmin = false;
    for (const usuarioCargo of usuarioCargos) {
      const cargo = await Cargo.getById(usuarioCargo.cargo_id);
      if (cargo && cargo.nivel_permissao >= 10) {
        isAdmin = true;
        break;
      }
    }

    if (isAdmin) {
      return next();
    } else {
      return res
        .status(403)
        .json({
          error: "Acesso negado. Privilégios de administrador necessários.",
        });
    }
  } catch (error) {
    console.error("Erro ao verificar privilégios de admin:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const requirePermissionLevel = (minLevel) => {
  return async (req, res, next) => {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: "Não autenticado" });
    }

    try {
      const UsuarioCargo = require("../models/usuarioCargoModel");
      const Cargo = require("../models/cargoModel");

      const usuarioCargos = await UsuarioCargo.getByUsuarioId(
        req.session.userId
      );

      if (!usuarioCargos || usuarioCargos.length === 0) {
        return res
          .status(403)
          .json({ error: "Acesso negado. Nenhum cargo encontrado." });
      }

      let hasPermission = false;
      let maxLevel = 0;

      for (const usuarioCargo of usuarioCargos) {
        const cargo = await Cargo.getById(usuarioCargo.cargo_id);
        if (cargo && cargo.nivel_permissao >= minLevel) {
          hasPermission = true;
          maxLevel = Math.max(maxLevel, cargo.nivel_permissao);
        }
      }

      if (hasPermission) {
        req.userPermissionLevel = maxLevel;
        return next();
      } else {
        return res.status(403).json({
          error: `Acesso negado. Nível de permissão ${minLevel} ou superior necessário.`,
        });
      }
    } catch (error) {
      console.error("Erro ao verificar nível de permissão:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  };
};

const requireAuthAPI = (req, res, next) => {
  if (req.session && req.session.userId) {
    req.userId = req.session.userId;
    return next();
  } else {
    return res.status(401).json({ error: "Não autenticado" });
  }
};

module.exports = {
  requireAuth,
  requireGuest,
  addUserToLocals,
  requireAdmin,
  requirePermissionLevel,
  requireAuthAPI,
};
