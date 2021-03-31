struct ObjectData {
  vec3  color;
  vec3  position;
  float radius;
};

struct Intersection {
  vec3  color;
  vec3  position;
  float radius;
};

#define SCENE_OBJECT_COUNT 5
#define MAX_STEP_COUNT 255
#define EPSILON .0001

uniform float      uStepSize;
uniform float      uStepCount;
uniform vec3       uBackgroundColor;
uniform ObjectData uScene[SCENE_OBJECT_COUNT];
uniform vec3       uLightPos;
varying vec2       vUv;


float sphereSDF(vec3 p, float radius) {
  return length(p) - radius;
}

float sceneSDF(vec3 p) {
  return min(100.,sphereSDF(p, .5));
}

float march(vec3 origin, vec3 direction, float start, float end) {
  float depth = start;
  for(int i = 0; i < MAX_STEP_COUNT; i++) {
    float dist = sceneSDF(origin + depth * direction);
    if(dist < EPSILON) return depth;
    depth += dist;
    if(depth >= end) return end;
  }
  return end;
}

vec3 rayDirection(float fieldOfView, vec2 size, vec2 fragCoord) {
    vec2 xy = fragCoord - size / 2.0;
    float z = size.y / tan(radians(fieldOfView) / 2.0);
    return normalize(vec3(xy, -z));
}

void main() {
  vec3 dir = rayDirection(45.0, vec2(1.), vUv);
  vec3 eye = vec3(0.0, 0.0, 5.0);
  float dist = march(eye, dir, 0., 15.);
  if(dist > 15. - EPSILON) {
    gl_FragColor = vec4(0.);
    return;
  }
  gl_FragColor = vec4(dist * vec3(1., 0., 0.), 1.0);
}