/**
 * @victorvhpg
 * https://github.com/victorvhpg/Template
 * template javascript simples 
 */

var Template = (function(window) {
    "use strict";

    var _configPadrao = {
        serializaObj: true,
        parametroInicio: "{@",
        parametroFim: "}"
    },
    document = window.document, Template, $ = window.jQuery, JSON = window.JSON;

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
                    template = parametros.template, item, $linhaHTML;
            if (!$.isArray(vetObjDados)) {
                vetObjDados = [vetObjDados];
            }
            for (var i = 0, len = vetObjDados.length; i < len; i++) {
                item = template.replace(new RegExp(parametroInicio + "(.*?)" + parametroFim, "g"), function(parametroCompleto, parametro) {
                    var obj = vetObjDados[i],
                            objs = parametro.split("."), args;
                    parametro = objs[objs.length - 1];
                    for (var j = 0, l = objs.length - 1; j < l; j++) {
                        obj = obj[objs[j]];
                    }
                    parametro = parametro.replace(/\((.*?)\)/, function(parenteses, argumentos) {
                        args = argumentos;
                        return "";
                    });
                    return  (typeof obj[parametro] === "function") ? obj[parametro](args) : obj[parametro];
                });
                $linhaHTML = $($.trim(item));
                serializaObj && $linhaHTML.attr("data-template-obj", JSON.stringify(vetObjDados[i]));
                if (typeof aCadaLinha === "function") {
                    $linhaHTML = aCadaLinha($linhaHTML, vetObjDados[i]) || $linhaHTML;
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
    
    if (typeof define === "function" && define.amd) {
        define(function() {
            return Template;
        });
    }
    return Template;
})(window);