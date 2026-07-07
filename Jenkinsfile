pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'call npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'call npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'call npx playwright test'
            }
        }

        stage('Publish HTML Report') {
            steps {
                publishHTML(target: [
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright HTML Report',
                    keepAll: true,
                    alwaysLinkToLastBuild: true,
                    allowMissing: false
                ])
            }
        }

    }

    post {

        always {
            archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
            echo 'Pipeline Execution Completed'
        }

        success {
            echo 'All Test Cases Passed'
        }

        failure {
            echo 'Some Test Cases Failed'
        }
    }
}