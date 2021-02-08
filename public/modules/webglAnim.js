const fs = `#ifdef GL_ES
precision mediump float;
#endif

#define PI2 6.28318530718
#define PI 3.14159265359
#define S(a,b,n) smoothstep(a,b,n)

uniform float uTime;
uniform float uProgress;
uniform vec2 uReso;
uniform vec2 uMouse;

varying vec3 vVertexPosition;
varying vec2 vTextureCoord0;
varying vec2 vTextureCoord1;
varying vec2 vTextureCoordMap;

uniform sampler2D texture0;
uniform sampler2D texture1;
uniform sampler2D map;

float exponentialEasing (float x, float a){

float epsilon = 0.00001;
float min_param_a = 0.0 + epsilon;
float max_param_a = 1.0 - epsilon;
a = max(min_param_a, min(max_param_a, a));

if (a < 0.5){
// emphasis
a = 2.0 * a;
float y = pow(x, a);
return y;
} else {
// de-emphasis
a = 2.0 * (a-0.5);
float y = pow(x, 1.0 / (1.-a));
return y;
}
}

vec4 blur13(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
vec4 color = vec4(0.0);
vec2 off1 = vec2(1.411764705882353) * direction;
vec2 off2 = vec2(3.2941176470588234) * direction;
vec2 off3 = vec2(5.176470588235294) * direction;
color += texture2D(image, uv) * 0.1964825501511404;
color += texture2D(image, uv + (off1 / resolution)) * 0.2969069646728344;
color += texture2D(image, uv - (off1 / resolution)) * 0.2969069646728344;
color += texture2D(image, uv + (off2 / resolution)) * 0.09447039785044732;
color += texture2D(image, uv - (off2 / resolution)) * 0.09447039785044732;
color += texture2D(image, uv + (off3 / resolution)) * 0.010381362401148057;
color += texture2D(image, uv - (off3 / resolution)) * 0.010381362401148057;
return color;
}

void main(){
vec2 uv0 = vTextureCoord0;
vec2 uv1 = vTextureCoord1;

float progress0 = uProgress;
float progress1 = 1. - uProgress;

vec4 map = blur13(map, vTextureCoordMap, uReso, vec2(2.)) + 0.5;

uv0.x += progress0 * map.r;
uv1.x -= progress1 * map.r;

vec4 color = texture2D( texture0, uv0 );
vec4 color1 = texture2D( texture1, uv1 );

gl_FragColor = mix(color, color1, progress0 );
}`;

const vs = `#ifdef GL_ES
precision mediump float;
#endif

attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

uniform mat4 texture0Matrix;
uniform mat4 texture1Matrix;
uniform mat4 mapMatrix;

varying vec3 vVertexPosition;
varying vec2 vTextureCoord0;
varying vec2 vTextureCoord1;
varying vec2 vTextureCoordMap;

void main() {
  vec3 vertexPosition = aVertexPosition;

  gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);

  vTextureCoord0 = (texture0Matrix * vec4(aTextureCoord, 0., 1.)).xy;
  vTextureCoord1 = (texture1Matrix * vec4(aTextureCoord, 0., 1.)).xy;
  vTextureCoordMap = (mapMatrix * vec4(aTextureCoord, 0., 1.)).xy;
  vVertexPosition = vertexPosition;}`;

export default class WebglHover {
  constructor(set) {
    this.canvas = set.canvas;
    this.webGLCurtain = new Curtains({
      container: this.canvas,
      watchScroll: false,
      pixelRatio: Math.min(1.5, window.devicePixelRatio),
    });
    this.planeElement = set.planeElement;
    this.mouse = {
      x: 0,
      y: 0,
    };
    this.params = {
      vertexShader: vs,
      fragmentShader: fs,
      widthSegments: 40,
      heightSegments: 40,
      uniforms: {
        time: {
          name: 'uTime',
          type: '1f',
          value: 0,
        },
        mousepos: {
          name: 'uMouse',
          type: '2f',
          value: [0, 0],
        },
        resolution: {
          name: 'uReso',
          type: '2f',
          value: [innerWidth, innerHeight],
        },
        progress: {
          name: 'uProgress',
          type: '1f',
          value: 0,
        },
      },
    };
    this.initPlane();
  }

  initPlane() {
    this.plane = new Plane(this.webGLCurtain, this.planeElement, this.params);

    if (this.plane) {
      this.plane.onReady(() => {
        this.update();
        this.initEvent();
      });
    }
  }

  update() {
    this.plane.onRender(() => {
      this.plane.uniforms.time.value += 0.01;

      this.plane.uniforms.resolution.value = [innerWidth, innerHeight];
    });
  }

  initEvent() {
    this.planeElement.addEventListener('mouseenter', () => {
      anime({
        targets: this.plane.uniforms.progress,
        duration: 800,
        easing: 'linear',
        value: 1,
      });
    });

    this.planeElement.addEventListener('mouseout', () => {
      anime({
        targets: this.plane.uniforms.progress,
        value: [1, 0],
        duration: 800,
        easing: 'linear',
      });
    });
  }
}
