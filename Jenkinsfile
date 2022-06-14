node {
  stage('Checkout from SCM') {
    checkout scm
  }

  stage('Setup NPM repo') {
    withCredentials([
      string(credentialsId: 'registry', variable: 'TOKEN')
    ]) {
      sh 'touch .npmrc'
      sh "echo '\n//${npmRepo}:_authToken=$TOKEN' >> .npmrc"
      sh 'cat .npmrc'
    }
  }

  withDockerContainer(image: 'node:16.13.1-alpine') {

  }

  docker.withRegistry('https://docker.nexus.marjoh.duckdns.org/', "nexus-docker") {
    def imageName = "blog-server:${env.BUILD_ID}"
    if (env.BRANCH_NAME != 'main') {
      imageName = imageName + "-${env.BRANCH_NAME}-dev"
    }
    stage('Build Image') {
      echo "Building Image ${imageName}"
      def image = docker.build(imageName)

      image.inside {
        stage('Setup') {
          sh "printenv"
          echo "Running ${env.BUILD_ID} on ${env.JENKINS_URL}"
        }

        stage('Install') {
          echo 'Installing Node Dependencies'
          sh 'npm ci'
        }

        stage('Test') {
          echo 'Testing application'
          sh 'npm test'
        }
      }
      stage('Publish Image') {
        echo 'Deploying'
        if (env.BRANCH_NAME == 'main') {
          image.push('latest')
        } else {
          image.push('dev')
        }
      }
    }
  }
}
