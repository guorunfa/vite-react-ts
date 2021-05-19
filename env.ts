interface Props {
  [propName: string]: any
}
const envObj: Props = {
  development: {
    cdn: './',
    apiBaseUrl: '/api'
  },
  beta: {
    cdn: '//abc.com/vite-react-app/beta',
    apiBaseUrl: '//www.beta.123.com/v1'
  },
  release: {
    cdn: '//abc.com/vite-react-app/release',
    apiBaseUrl: '//www.123.com/v1'
  }
}
export default envObj;