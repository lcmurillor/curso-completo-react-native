const { ApolloServer } = require("apollo-server");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });
const Usuario = require("../models/usuario");
const Proyecto = require("../models/proyecto");
const Tarea = require("../models/tareas");

const cursos = [
  {
    titulo: "Javascript Moderno Guía definitiva Construye +10 Proyectos",
    tecnologia: "Javascript ES6",
  },
  {
    titulo: "React - La Guía Completa: Hooks Context Redux MERN +15 Apps",
    tecnologia: "React",
  },
  {
    titulo: "Node js - Bootcamp Desarrollo Web inc. MVC y REST API",
    tecnologia: "Node js",
  },
  {
    titulo: "React js - ReactJS Avanzado - FullStack React GraphQL y Apollo",
    tecnologia: "React js",
  },
];

const crearToken = (usuario, secreta, expiresIn) => {
  const { id, email, nombre } = usuario;
  return jwt.sign({ id, email, nombre }, secreta, { expiresIn });
};

const resolvers = {
  Query: {
    obtenerProyectos: async (root, { input }, context, info) => {
      const proyectos = await Proyecto.find({ creador: context.usuario.id });
      return proyectos;
    },

    obtenerTareas: async (root, { input }, context, info) => {
      const tareas = await Tarea.find({ creador: context.usuario.id })
        .where("proyecto")
        .equals(input.proyecto);
      return tareas;
    },
  },
  Mutation: {
    crearUsuario: async (root, { input }, context, info) => {
      const { email, password } = input;

      const existeUsuario = await Usuario.findOne({ email });

      console.log(existeUsuario);
      if (existeUsuario) {
        throw new Error("El usuario ya está registrado");
      }

      try {
        //Encriptar la contraseña
        const salt = await bcryptjs.genSalt(10);
        input.password = await bcryptjs.hash(password, salt);

        //Regristrar el usuario
        const nuevoUsuario = new Usuario(input);
        console.log(nuevoUsuario);
        nuevoUsuario.save();
        return "Usuario Creado Correctamente";
      } catch (error) {
        console.log(error);
      }
    },
    autenticarUsuario: async (root, { input }, context, info) => {
      const { email, password } = input;

      //Si el usuario Existe
      const existeUsuario = await Usuario.findOne({ email });
      if (!existeUsuario) {
        throw new Error("El usuario no existe");
      }

      //Si el password es correcto
      const passwordCorrecto = await bcryptjs.compare(
        password,
        existeUsuario.password
      );
      if (!passwordCorrecto) {
        throw new Error("Contraseña Incorrecta");
      }

      //Dar acceso a la app
      return {
        token: crearToken(existeUsuario, process.env.SECRETA, "5hr"),
      };
    },
    nuevoProyecto: async (root, { input }, context, info) => {
      try {
        const proyecto = new Proyecto(input);

        //Asociar el creadod
        proyecto.creador = context.usuario.id;

        //Almacenarlo en la base de datos
        const resultado = await proyecto.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },

    actualizarProyecto: async (root, { id, input }, context, info) => {
      try {
        //Revisar si el proyecto Existe
        let proyecto = await Proyecto.findById(id);

        if (!proyecto) {
          throw new Error("Proyecto no encontrado");
        }

        //Revisar si la persona que trata de modificarlo es el creador
        if (proyecto.creador.toString() !== context.usuario.id) {
          throw new Error("No tienes las credenciales para Editar");
        }
        //Almacenarlo en la base de datos
        proyecto = await Proyecto.findOneAndUpdate({ _id: id }, input, {
          new: true,
        });
        return proyecto;
      } catch (error) {
        console.log(error);
      }
    },

    eliminarProyecto: async (root, { id }, context, info) => {
      //Revisar si el proyecto Existe
      let proyecto = await Proyecto.findById(id);

      if (!proyecto) {
        throw new Error("Proyecto no encontrado");
      }

      //Revisar si la persona que trata de modificarlo es el creador
      if (proyecto.creador.toString() !== context.usuario.id) {
        throw new Error("No tienes las credenciales para Editar");
      }

      //Eliminar
      await Proyecto.findOneAndDelete({ _id: id });
      return "Proyecto Elimiando";
    },

    nuevaTarea: async (root, { id, input }, context, info) => {
      try {
        console.log(input);

        const tarea = new Tarea(input);
        console.log(tarea);

        tarea.creador = context.usuario.id;
        const resultado = await tarea.save();
        return resultado;
      } catch (error) {
        console.log(error);
      }
    },
    actualizarTarea: async (root, { id, input, estado }, context, info) => {
      try {
        //Revisar si el proyecto Existe
        let tarea = await Tarea.findById(id);

        if (!tarea) {
          throw new Error("Tarea no encontrada");
        }

        //Revisar si la persona que trata de modificarlo es el creador
        if (tarea.creador.toString() !== context.usuario.id) {
          throw new Error("No tienes las credenciales para Editar");
        }

        input.estado = estado;

        //Almacenarlo en la base de datos
        tarea = await Tarea.findOneAndUpdate({ _id: id }, input, {
          new: true,
        });
        return tarea;
      } catch (error) {
        console.log(error);
      }
    },

    eliminarTarea: async (root, { id }, context, info) => {
      //Revisar si el proyecto Existe
      let tarea = await Tarea.findById(id);

      if (!tarea) {
        throw new Error("tarea no encontrada");
      }

      //Revisar si la persona que trata de modificarlo es el creador
      if (tarea.creador.toString() !== context.usuario.id) {
        throw new Error("No tienes las credenciales para Editar");
      }

      //Eliminar
      await Tarea.findOneAndDelete({ _id: id });
      return "Tarea Elimiando";
    },
  },
};

module.exports = resolvers;
