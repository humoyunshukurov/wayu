import {Module} from "@nestjs/common";
import {CqrsModule} from "@nestjs/cqrs";
import {CountriesController} from "./countries/countries.controller";
import {CreateCountryHandler} from "./countries/commands/create-country/create-country.handler";
import {DeleteCountryHandler} from "./countries/commands/delete-country/delete-country.handler";
import {UpdateCountryHandler} from "./countries/commands/update-country/update-country.handler";
import {GetAllCountriesHandler} from "./countries/queries/get-all-countries/get-all-countries.handler";
import {GetCountryByIdHandler} from "./countries/queries/get-country-by-id/get-country-by-id.handler";
import {EventController} from "./event/event.controller";
import {CreateEventHandler} from "./event/commands/create-event/create-event.handler";
import {UpdateEventHandler} from "./event/commands/update-event/update-event.handler";
import {GetAllEventsHandler} from "./event/queries/get-all-events/get-all-events.handler";
import {GetEventByIdHandler} from "./event/queries/get-event-by-id/get-event-by-id.handler";
import {FaqsController} from "./faqs/faqs.controller";
import {CreateFaqHandler} from "./faqs/commands/create-faq/create-faq.handler";
import {DeleteFaqHandler} from "./faqs/commands/delete-faq/delete-faq.handler";
import {UpdateFaqHandler} from "./faqs/commands/update-faq/update-faq.handler";
import {GetAllFaqsHandler} from "./faqs/queries/get-all-faqs/get-all-faqs.handler";
import {GetFaqByIdHandler} from "./faqs/queries/get-faq-by-id/get-faq-by-id.handler";
import {DeleteEventHandler} from "@/features/content/event/commands/delete-event/delate-event.handler";

@Module({
    imports: [CqrsModule],
    controllers: [ FaqsController, CountriesController, EventController],
    providers: [

        CreateFaqHandler,
        UpdateFaqHandler,
        DeleteFaqHandler,
        GetAllFaqsHandler,
        GetFaqByIdHandler,
        CreateCountryHandler,
        UpdateCountryHandler,
        DeleteCountryHandler,
        GetAllCountriesHandler,
        GetCountryByIdHandler,
        CreateEventHandler,
        UpdateEventHandler,
        DeleteEventHandler,
        GetAllEventsHandler,
        GetEventByIdHandler,
    ],
})
export class ContentModule {}