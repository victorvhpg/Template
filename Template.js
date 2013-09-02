/**
 * 
 * @victorvhpg
 * template simples 
 */

var Template = (function(window) {
    "use strict";

    var _configPadrao = {
        serializaObj: true,
        parametroInicio: "{@",
        parametroFim: "}"
    },
    document = window.document, Template, $ = window.jQuery;


    Template = function(config) {
        this.config = $.extend({}, _configPadrao, config);
    };

    Template.getInstancia = function(config) {
        return new Template(config);
    };

    Template.prototype = {
        constructor: Template,
        renderizar: function(parametros) {
            var $resultados = $(document.createDocumentFragment()),
                    vetObjDados = parametros.dados, aCadaLinha = parametros.aCadaLinha,
                    parametroInicio = this.config.parametroInicio,
                    parametroFim = this.config.parametroFim,
                    serializaObj = this.config.serializaObj,
                    template = parametros.template, item;
            if (!$.isArray(vetObjDados)) {
                vetObjDados = [vetObjDados];
            }
            for (var i = 0, len = vetObjDados.length; i < len; i++) {
                item = template;
                for (var j in vetObjDados[i]) {
                    item = item.replace(new RegExp(parametroInicio + j + parametroFim, "g"), vetObjDados[i][j]);
                }
                var $linhaHTML = $($.trim(item));
                serializaObj && $linhaHTML.attr("data-template-obj", JSON.stringify(vetObjDados[i]));
                if (typeof aCadaLinha === "function") {
                    $linhaHTML = aCadaLinha($linhaHTML, vetObjDados[i]);
                }
                $resultados.append($linhaHTML);
            }
            return $resultados;
        }
    };
    Template.renderizar = function(parametros) {
        var tmpl = Template.getInstancia(parametros.config);
        return tmpl.renderizar(parametros);
    };
    return Template;
})(window);