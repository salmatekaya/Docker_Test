pipeline{
	agent any

	environment {
		DOCKERHUB_CREDENTIALS=credentials('dockerhub_cred')
	}
	
	stages{
	stage('Build') {

			steps {
				sh 'docker build -t raafetmadani/gl_project:latest .'
			}
		}

	stage('Login') {

			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'			
			}	
		}

	stage('Push') {

			steps {
				sh 'docker push raafetmadani/gl_project:latest'
			}
		}


	stage('test'){
		nodejs(nodeJSInstallationName: 'nodejs'){
			sh 'npm install'
			sh 'npm test'
		}
	}
	}
}
