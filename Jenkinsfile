pipeline {
    agent any

    stages{
        stage('Checkout Code'){
            steps{
                checkout scm
            }
        }


        stage('install Dependencies'){
            steps{
                bat 'call npm install'
            }
        }


        stage('Install playwright Browsers') {
            steps{
                bat 'call npx playwright install'
            }
        }

        stage('Run playwright tests') {
            steps{
                bat 'call npx playwright test'
            }
        }

        stage('publish html reports'){
            steps{
                publishHTML(target:[
                    reportDir:'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'playwright html reporter',
                    keppAll: true,
                    allowMissing: false
                ])
            }
        }
    
      post{

        always{
            archieveArtifacts artifacts:'playwright-report/**/*',allowEmptyArchieve:true
            echo 'Pipeline Exectution completed'

        }

        success {
            echo 'All test cases passed'
        }

        failure{
            echo 'some test cases gets failed'
        }
      }
    
    
    }


}