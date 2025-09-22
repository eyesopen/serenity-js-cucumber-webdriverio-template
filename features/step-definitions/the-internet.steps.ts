import { After, AfterAll, Before, BeforeStep, Given, Then, When } from '@cucumber/cucumber';
import { Actor, actorInTheSpotlight } from '@serenity-js/core';
import { Navigate } from '@serenity-js/web';

import { Authenticate, VerifyAuthentication } from '../../test/authentication';
import { PickExample } from '../../test/examples';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

Before(async() => {
    console.log(`Before @ ${new Date().toISOString()}`);
    await sleep(2000);
    console.log(`Before finished @ ${new Date().toISOString()}`);
});

BeforeStep(({pickleStep}) => {
    console.log(`${pickleStep.text} @ ${new Date().toISOString()}`);
});

After(async() => {
    console.log(`After @ ${new Date().toISOString()}`);
    await sleep(2000);
    console.log(`After finished @ ${new Date().toISOString()}`);
});
AfterAll(async () => {
    console.log(`AfterAll @ ${new Date().toISOString()}`);
    await sleep(2000);
    console.log(`AfterAll finished @ ${new Date().toISOString()}`);

});


/**
 * Below step definitions use Cucumber Expressions
 * see: https://cucumber.io/docs/cucumber/cucumber-expressions/
 *
 * {actor} and {pronoun} are custom expressions defined under support/parameters.ts
 */
Given('{actor} starts with the {string} example', async (actor: Actor, exampleName: string) =>
    actor.attemptsTo(
        Navigate.to('/'),
        PickExample.called(exampleName),
    )
);

When('{pronoun} log(s) in using {string} and {string}', async (actor: Actor, username: string, password: string) =>
    actor.attemptsTo(
        Authenticate.using(username, password),
    )
);

/**
 * If you need to use a RegExp instead of Cucumber Expressions like {actor} and {pronoun}
 * you can use actorCalled(name) and actorInTheSpotlight() instead
 *
 *  see: https://serenity-js.org/modules/core/function/index.html#static-function-actorCalled
 *  see: https://serenity-js.org/modules/core/function/index.html#static-function-actorInTheSpotlight
 */
Then(/.* should see that authentication has (succeeded|failed)/, async (expectedOutcome: string) =>
    actorInTheSpotlight().attemptsTo(
        VerifyAuthentication[expectedOutcome](),
    )
);



