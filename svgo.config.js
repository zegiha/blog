module.exports = {
  plugins: [
    { name: 'removeViewBox', active: false }, // viewBox 유지
    { name: 'removeDimensions', active: true }, // width/height 제거 → CSS/props로 제어
    {
      name: 'convertColors',
      params: {
        currentColor: false,
        to: 'var(--label-normal)'
      }
    }
  ]
}