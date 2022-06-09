"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var generarAletaorio = function generarAletaorio() {
  return Math.floor(Math.random() * 256);
};

var GeneradorColores = /*#__PURE__*/function () {
  function GeneradorColores() {
    _classCallCheck(this, GeneradorColores);
  }

  _createClass(GeneradorColores, [{
    key: "generar",
    value: function generar() {
      var rojo = generarAletaorio();
      var verde = generarAletaorio();
      var azul = generarAletaorio();
      return "rgb(".concat(rojo, ",").concat(verde, ",").concat(azul, ")");
    }
  }]);

  return GeneradorColores;
}();
