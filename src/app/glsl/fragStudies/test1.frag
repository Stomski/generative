#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;

void main() {


vec2 uv = (gl_FragCoord.xy);

uv = uv.xy*0.001;

gl_FragColor = vec4(uv.x,uv.y,0.5,1.0);




}
