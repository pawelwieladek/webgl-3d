function ShaderProgram(GL) {
    this.GL = GL;
    this.shaderProgram = this.GL.createProgram();
    this.shaders = [];
    this.attributes = {};
    this.uniforms = {};
}

ShaderProgram.prototype = {
    getShader: function(sourceScriptId) {
        var shaderScript = document.getElementById(sourceScriptId);
        if (!shaderScript) {
            throw new Error("Shader source script doesn't exists.");
        }
        var shader = null;

        var str = "";
        var k = shaderScript.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        if (shaderScript.type == "x-shader/x-fragment") {
            shader = this.GL.createShader(this.GL.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = this.GL.createShader(this.GL.VERTEX_SHADER);
        } else {
            throw new Error("Invalid type of shader script.");
        }

        this.GL.shaderSource(shader, str);
        this.GL.compileShader(shader);

        if (!this.GL.getShaderParameter(shader, this.GL.COMPILE_STATUS)) {
            throw new Error(this.GL.getShaderInfoLog(shader));
        }
        return shader;
    },
    addShader: function(shaderScriptId) {
        this.shaders.push(this.getShader(shaderScriptId));
    },
    run: function() {
        var shaderProgram = this.shaderProgram;
        var GL = this.GL;
        this.shaders.forEach(function(shader) {
            GL.attachShader(shaderProgram, shader);
        });
        GL.linkProgram(shaderProgram);
        if (!GL.getProgramParameter(shaderProgram, GL.LINK_STATUS)) {
            throw new Error("Could not initialise shaders");
        }
        GL.useProgram(shaderProgram);
    },
    addAttribute: function(name) {
        this.attributes[name] = this.GL.getAttribLocation(this.shaderProgram, name);
        this.GL.enableVertexAttribArray(this.attributes[name]);
    },
    getAttribute: function(key) {
        if(this.attributes.hasOwnProperty(key)) {
            return this.attributes[key];
        } else {
            throw new Error("Attribute doesn't exist.");
        }
    },
    addUniform: function(name) {
        this.uniforms[name] = this.GL.getUniformLocation(this.shaderProgram, name);
    },
    setUniformMatrix4: function(key, matrix) {
        this.addUniform(key);
        this.GL.uniformMatrix4fv(this.uniforms[key], false, matrix);
    },
    setUniformMatrix3: function(key, matrix) {
        this.addUniform(key);
        this.GL.uniformMatrix3fv(this.uniforms[key], false, matrix);
    },
    setUniformVector3: function(key, vector3) {
        this.addUniform(key);
        this.GL.uniform3fv(this.uniforms[key], vector3);
    },
    setUniformFloat: function(key, value) {
        this.addUniform(key);
        this.GL.uniform1f(this.uniforms[key], value);
    },
    setUniformInteger: function(key, value) {
        this.addUniform(key);
        this.GL.uniform1i(this.uniforms[key], value);
    }
};