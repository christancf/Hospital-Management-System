import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppLayout from "layouts/app-layout";
import AuthLayout from 'layouts/auth-layout';
import WardLayout from "layouts/ward-layout";
import InventoryLayout from "layouts/inventory-layout";
import BillingLayout from "layouts/billing-layout";
import PatientLayout from "layouts/patient-layout";
import MortuaryLayout from "layouts/mortuary-layout";
import StaffLayout from "layouts/staff-layout";
import DoctorChannellingLayout from "layouts/doctor-channelling-layout";
import FrontlineChannellingLayout from "layouts/frontline-channelling-layout";
import AppLocale from "lang";
import BloodBankLayout  from "layouts/bloodbank-layout";
import { IntlProvider } from "react-intl";
import { ConfigProvider } from 'antd';
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH, MORTUARY_PREFIX_PATH, BLOODBANK_PREFIX_PATH, PATIENT_PREFIX_PATH, BILLING_PREFIX_PATH, INVENTORY_PREFIX_PATH, WARD_PREFIX_PATH, STAFF_PREFIX_PATH, DOCTOR_CHANNELLING_PREFIX_PATH, FRONTLINE_CHANNELLING_PREFIX_PATH } from 'configs/AppConfig'
import useBodyClass from 'hooks/useBodyClass';

export const Views = (props) => {
  const { locale, location, direction } = props;
  const currentAppLocale = AppLocale[locale];
  useBodyClass(`dir-${direction}`);
  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}>
      <ConfigProvider locale={currentAppLocale.antd} direction={direction}>
        <Switch>
          <Route exact path="/">
            <Redirect to={APP_PREFIX_PATH} />
          </Route>
          <Route path={AUTH_PREFIX_PATH}>
            <AuthLayout direction={direction} />
          </Route>
          <Route path={APP_PREFIX_PATH}>
            <AppLayout direction={direction} location={location}/>
          </Route>
          <Route path={INVENTORY_PREFIX_PATH}>
            <InventoryLayout direction={direction} location={location}/>
          </Route>
          <Route path={BILLING_PREFIX_PATH}>
            <BillingLayout direction={direction} location={location}/>
          </Route>
          <Route path={PATIENT_PREFIX_PATH}>
            <PatientLayout direction={direction} location={location}/>
          </Route>
          <Route path={BLOODBANK_PREFIX_PATH}>
            <BloodBankLayout direction={direction} location={location}/>
          </Route>
          <Route path={MORTUARY_PREFIX_PATH}>
            <MortuaryLayout direction={direction} location={location}/>
          </Route>
          <Route path={STAFF_PREFIX_PATH}>
            <StaffLayout direction={direction} location={location}/>
          </Route>
          <Route path={WARD_PREFIX_PATH}>
            <WardLayout direction={direction} location={location}/>
          </Route>
          <Route path={DOCTOR_CHANNELLING_PREFIX_PATH}>
            <DoctorChannellingLayout direction={direction} location={location}/>
          </Route>
          <Route path={FRONTLINE_CHANNELLING_PREFIX_PATH}>
            <FrontlineChannellingLayout direction={direction} location={location}/>
          </Route>
        </Switch>
      </ConfigProvider>
    </IntlProvider>
  )
}

const mapStateToProps = ({ theme, auth }) => {
  const { locale, direction } =  theme;
  const { token } = auth;
  return { locale, token, direction }
};

export default withRouter(connect(mapStateToProps)(Views));