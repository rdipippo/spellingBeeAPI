import { aws_apigateway as apigw, StackProps, Stack } from 'aws-cdk-lib';
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from 'constructs';

export class SpellingBeeApiStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const handler = new lambda.Function(this, "lambda.getGameInfoHandler", {
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset("resources"),
      handler: "getGameInfoLambda.handler"
    });

    const api = new apigw.RestApi(this, 'spelling-bee-api')
    api.root.addMethod('GET', new apigw.HttpIntegration('https://freebee.fun/cgi-bin/random'));
    const game = api.root.addResource('game');
    game.addMethod('GET', new apigw.LambdaIntegration(handler));
  }
}
